import json
import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

ROOT = r"C:\Users\metin\.gemini\antigravity\scratch\mufettis.org"
SQL_PATH = os.path.join(ROOT, "backup", "database.sql")
JSON_PATH = os.path.join(ROOT, "extracted_content.json")
SRC_DATA = os.path.join(ROOT, "src", "data")
os.makedirs(SRC_DATA, exist_ok=True)

# 1. Extract snippet 185 from SQL if present
snippet_185_content = ""
with open(SQL_PATH, "r", encoding="utf-8", errors="replace") as f:
    sql = ''.join(f.readlines()[39563:40011])

m185 = re.search(r'\(185,\d+,\'[^\']*\',\'[^\']*\',((?:\'[^\']*(?:\\\'[^\']*)*\'|NULL)),\'((?:\\\'|[^\'])*)\'', sql)
if m185:
    raw = m185.group(1)
    if raw.startswith("'") and raw.endswith("'"):
        raw = raw[1:-1]
    snippet_185_content = raw.replace(r"\'", "'").replace(r'\"', '"').replace(r"\r\n", "\n").replace(r"\n", "\n")

with open(JSON_PATH, "r", encoding="utf-8") as f:
    data = json.load(f)

question_counter = 0

def transform_shortcodes(content, post_title=""):
    global question_counter

    # 1. Replace [wpcode id="185"]
    if '[wpcode id="185"]' in content or '[wpcode id=\'185\']' in content:
        content = content.replace('[wpcode id="185"]', snippet_185_content)
        content = content.replace('[wpcode id=\'185\']', snippet_185_content)

    # 2. [su_highlight background="..."]...[/su_highlight]
    def replace_highlight(m):
        text = m.group(1).strip()
        return f'<mark class="bg-amber-100 dark:bg-amber-950/80 text-amber-950 dark:text-amber-200 px-2 py-0.5 rounded-md font-semibold border-b-2 border-amber-400">{text}</mark>'
    content = re.sub(r'\[su_highlight[^\]]*\](.*?)\[/su_highlight\]', replace_highlight, content, flags=re.DOTALL)

    # 3. [su_heading style="..." size="..."]...[/su_heading]
    def replace_heading(m):
        text = m.group(1).strip()
        return f'''
        <div class="my-8 pb-3 border-b-2 border-brand-600 dark:border-sky-500 flex items-center gap-3">
            <span class="w-2.5 h-6 rounded-full bg-brand-600 dark:bg-sky-400 inline-block shadow-sm"></span>
            <h3 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">{text}</h3>
        </div>
        '''
    content = re.sub(r'\[su_heading[^\]]*\](.*?)\[/su_heading\]', replace_heading, content, flags=re.DOTALL)

    # 4. [su_service title="..." icon="..."]...[/su_service] or self-closing [su_service ...]
    def replace_service(m):
        title = m.group(1).strip()
        inner = m.group(2).strip() if len(m.groups()) > 1 and m.group(2) else ""
        return f'''
        <div class="my-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-50 via-amber-50/50 to-orange-50/30 dark:from-[#241705] dark:via-[#1c1204] dark:to-[#140c02] border-2 border-amber-300 dark:border-amber-700/80 shadow-md">
            <div class="flex items-start gap-3.5">
                <div class="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-lg shrink-0 shadow-sm">
                    💡
                </div>
                <div class="flex-grow min-w-0">
                    <span class="text-[11px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
                        Hafıza Çivisi & Püf Nokta
                    </span>
                    <h4 class="text-base sm:text-lg font-black text-slate-900 dark:text-amber-100 leading-snug mb-1.5">
                        {title}
                    </h4>
                    {f'<div class="text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed mt-2">{inner}</div>' if inner else ''}
                </div>
            </div>
        </div>
        '''
    content = re.sub(r'\[su_service\s+title="([^"]+)"[^\]]*\](.*?)\[/su_service\]', replace_service, content, flags=re.DOTALL)
    content = re.sub(r'\[su_service\s+title="([^"]+)"[^\]]*\]', lambda m: replace_service(re.match(r'\[su_service\s+title="([^"]+)"[^\]]*\]()', m.group(0))), content)

    # 5. [su_row] and [su_column]
    def replace_row(m):
        inner = m.group(1).strip()
        has_third = '1/3' in inner
        cols_class = "grid grid-cols-1 md:grid-cols-3 gap-5 my-6" if has_third else "grid grid-cols-1 md:grid-cols-2 gap-5 my-6"
        return f'<div class="{cols_class}">{inner}</div>'
    
    def replace_col(m):
        inner = m.group(1).strip()
        return f'<div class="flex flex-col justify-between">{inner}</div>'

    content = re.sub(r'\[su_column[^\]]*\](.*?)\[/su_column\]', replace_col, content, flags=re.DOTALL)
    content = re.sub(r'\[su_row\](.*?)\[/su_row\]', replace_row, content, flags=re.DOTALL)

    # 6. [su_note]...[/su_note]
    def replace_note(m):
        inner = m.group(1).strip()
        is_answer = "Doğru Cevap:" in inner or "Cevap:" in inner
        is_warning = any(w in inner for w in ['Dikkat:', 'Önemli:', 'UYARI:', 'NOT:'])
        
        if is_answer:
            return f'''
            <div class="my-5 p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border-2 border-emerald-300 dark:border-emerald-700/80 shadow-xs">
                <div class="flex items-start gap-3">
                    <span class="text-emerald-600 dark:text-emerald-400 text-lg font-black shrink-0 mt-0.5">✓</span>
                    <div class="text-emerald-950 dark:text-emerald-100 text-sm sm:text-base leading-relaxed font-medium">
                        {inner}
                    </div>
                </div>
            </div>
            '''
        elif is_warning:
            return f'''
            <div class="my-5 p-5 sm:p-6 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border-l-4 border-amber-500 border-t border-r border-b border-amber-200 dark:border-amber-800/80 shadow-xs">
                <div class="flex items-start gap-3.5">
                    <span class="text-lg shrink-0 mt-0.5">⚠️</span>
                    <div class="text-amber-950 dark:text-amber-100 text-sm sm:text-base leading-relaxed font-medium">
                        {inner}
                    </div>
                </div>
            </div>
            '''
        else:
            return f'''
            <div class="my-5 p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border-l-4 border-brand-600 dark:border-sky-400 border-t border-r border-b border-slate-200 dark:border-slate-800 shadow-sm">
                <div class="flex items-start gap-3.5">
                    <span class="text-lg shrink-0 mt-0.5">📌</span>
                    <div class="text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
                        {inner}
                    </div>
                </div>
            </div>
            '''
    content = re.sub(r'\[su_note[^\]]*\](.*?)\[/su_note\]', replace_note, content, flags=re.DOTALL)

    # 7. [su_box title="..."] (Interactive Question vs Content Feature Box)
    def format_box_or_question(match):
        global question_counter
        raw_title = match.group(1).strip()
        inner = match.group(2).strip()

        # Check if this box is an INTERACTIVE QUESTION
        has_options = bool(re.search(r'[A-E]\)', inner))
        has_spoiler_ans = bool(re.search(r'Doğru Cevap:\s*[A-E]', inner, re.IGNORECASE))
        is_quiz = has_options or has_spoiler_ans or any(k in raw_title.lower() for k in ['soru', 'örnek soru', 'test'])

        if is_quiz and has_options:
            question_counter += 1
            q_num = question_counter
            clean_title = re.sub(r'^\d+[\.\-\)]\s*', '', raw_title)

            # Extract spoiler (correct answer & explanation)
            spoiler_match = re.search(r'\[su_spoiler\s+title="[^"]*"[^\]]*\](.*?)\[/su_spoiler\]', inner, re.DOTALL)
            correct_answer = "A"
            explanation_html = ""

            if spoiler_match:
                spoiler_text = spoiler_match.group(1).strip()
                ans_match = re.search(r'Doğru Cevap:\s*([A-E])', spoiler_text, re.IGNORECASE)
                if ans_match:
                    correct_answer = ans_match.group(1).upper()
                
                exp_parts = re.split(r'<hr\s*/?>', spoiler_text, maxsplit=1)
                if len(exp_parts) > 1:
                    explanation_html = exp_parts[1].strip()
                else:
                    explanation_html = re.sub(r'✅?\s*Doğru Cevap:\s*[A-E]', '', spoiler_text, flags=re.IGNORECASE).strip()
                
                inner_without_spoiler = re.sub(r'\[su_spoiler\s+title="[^"]*"[^\]]*\].*?\[/su_spoiler\]', '', inner, flags=re.DOTALL).strip()
            else:
                inner_without_spoiler = inner

            # Options A), B), C), D), E)
            opt_pattern = re.compile(r'([A-E])\)\s*(.*?)(?=(?:[A-E]\)|\Z))', re.DOTALL)
            options = opt_pattern.findall(inner_without_spoiler)

            lead_text = ""
            first_opt_idx = inner_without_spoiler.find("A)")
            if first_opt_idx > 0:
                lead_text = inner_without_spoiler[:first_opt_idx].strip()

            options_html = ""
            for letter, opt_text in options:
                opt_clean = opt_text.strip().replace("\n", "<br>")
                options_html += f'''
                <button type="button" 
                  class="quiz-option-btn group w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50/70 hover:bg-brand-50/50 dark:bg-slate-900/40 dark:hover:bg-brand-950/30 hover:border-brand-500 dark:hover:border-sky-500 transition-all duration-200 flex items-start gap-3.5 sm:gap-4 cursor-pointer focus:outline-none relative overflow-hidden" 
                  data-option="{letter}">
                    <span class="option-badge inline-flex items-center justify-center w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 font-extrabold text-sm text-slate-700 dark:text-slate-300 group-hover:border-brand-500 group-hover:bg-brand-600 group-hover:text-white transition-all shrink-0 shadow-sm">
                        {letter}
                    </span>
                    <span class="option-text text-sm sm:text-[15px] text-slate-800 dark:text-slate-200 leading-relaxed pt-0.5 font-medium group-hover:text-slate-950 dark:group-hover:text-white">
                        {opt_clean}
                    </span>
                </button>
                '''

            return f'''
            <div class="interactive-quiz-card my-10 bg-white dark:bg-[#0c1827] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden" data-question-num="{q_num}" data-correct-answer="{correct_answer}">
                <div class="bg-gradient-to-r from-[#0b2b46] via-[#103a60] to-[#071d30] text-white px-5 sm:px-7 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-brand-800/80">
                    <div class="flex items-center gap-3">
                        <span class="inline-flex items-center justify-center px-3 py-1 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs tracking-wider shadow-md">
                            SORU {q_num:02d}
                        </span>
                        <span class="text-xs font-semibold text-slate-300 hidden sm:inline-flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                            Mevzuat & Standart Pratiği
                        </span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="quiz-status-badge text-[11px] font-bold px-3 py-1 rounded-full bg-black/40 text-slate-300 border border-slate-700/60 flex items-center gap-1.5 backdrop-blur-sm shadow-xs transition-colors">
                            <span class="status-dot w-2 h-2 rounded-full bg-slate-400"></span>
                            <span class="status-text">Yanıt Bekliyor</span>
                        </span>
                    </div>
                </div>

                <div class="p-6 sm:p-8">
                    <div class="question-stem mb-6">
                        <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed tracking-tight">
                            {clean_title}
                        </h3>
                        {f'<div class="mt-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">{lead_text}</div>' if lead_text else ''}
                    </div>

                    <div class="options-grid space-y-3">
                        {options_html}
                    </div>

                    <div class="quiz-feedback-box hidden mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 transition-all duration-300">
                        <div class="feedback-banner p-4 rounded-2xl mb-4 font-bold text-sm flex items-center justify-between shadow-sm">
                            <div class="feedback-message flex items-center gap-2"></div>
                            <button type="button" class="quiz-reset-btn text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-lg bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 transition-colors cursor-pointer flex items-center gap-1">
                                <span>↺</span> Tekrar Çöz
                            </button>
                        </div>

                        <div class="solution-card p-5 sm:p-7 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 border-2 border-slate-200 dark:border-slate-800 shadow-sm">
                            <div class="flex items-center gap-2 text-xs font-black text-brand-700 dark:text-sky-400 uppercase tracking-wider mb-3.5">
                                <span class="text-base">⚖️</span>
                                <span>Müfettiş Notu, Mevzuat Referansı ve Çözüm Analizi:</span>
                            </div>
                            <div class="solution-html prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-sm sm:text-[15px] leading-relaxed space-y-2">
                                {explanation_html}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            '''
        else:
            # THIS IS A CONTENT / FEATURE BOX (e.g. 📌 NOT:, Bilgi Notları, Piyasalar, Oranlar)
            return f'''
            <div class="my-8 rounded-3xl overflow-hidden border-2 border-brand-800/80 bg-white dark:bg-[#0c1827] shadow-lg">
                <div class="bg-gradient-to-r from-[#0b2b46] via-[#113a60] to-[#071d30] text-white px-5 sm:px-6 py-3.5 flex items-center justify-between border-b border-brand-800">
                    <div class="flex items-center gap-2.5">
                        <span class="text-amber-400 text-base">📑</span>
                        <h4 class="font-black text-sm sm:text-base text-white tracking-tight">{raw_title}</h4>
                    </div>
                    <span class="text-[10px] font-bold text-slate-300 uppercase tracking-wider bg-black/30 px-2.5 py-0.5 rounded-full border border-white/10">Müfettiş İncelemesi</span>
                </div>
                <div class="p-5 sm:p-7 text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed prose dark:prose-invert max-w-none">
                    {inner}
                </div>
            </div>
            '''

    content = re.sub(r'\[su_box\s+title="([^"]+)"[^\]]*\](.*?)\[/su_box\]', format_box_or_question, content, flags=re.DOTALL)

    # 8. [su_spoiler] Standalone
    def replace_standalone_spoiler(match):
        title = match.group(1).strip()
        inner = match.group(2).strip()
        return f'''
        <details class="group my-8 border-2 border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-[#0c1827] shadow-sm hover:border-brand-500/50 transition-colors">
            <summary class="cursor-pointer select-none list-none flex items-center justify-between p-4 sm:p-5 bg-slate-50/80 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-brand-700 dark:text-sky-400 font-bold text-sm sm:text-base transition-colors">
                <span class="flex items-center gap-2">
                    <span class="text-amber-500 text-lg">💡</span>
                    <span>{title}</span>
                </span>
                <span class="transform transition-transform duration-200 group-open:rotate-180 text-slate-400 text-xs">▼</span>
            </summary>
            <div class="p-6 border-t border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base prose dark:prose-invert max-w-none">
                {inner}
            </div>
        </details>
        '''
    content = re.sub(r'\[su_spoiler\s+title="([^"]+)"[^\]]*\](.*?)\[/su_spoiler\]', replace_standalone_spoiler, content, flags=re.DOTALL)

    # 9. [su_divider]
    content = re.sub(r'\[su_divider[^\]]*\]', '<hr class="my-10 border-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />', content)

    # 10. [su_spacer]
    content = re.sub(r'\[su_spacer[^\]]*\]', '<div class="h-4 sm:h-6"></div>', content)

    # 11. [su_accordion] wrapper
    content = re.sub(r'\[su_accordion\]', '<div class="space-y-4 my-8">', content)
    content = re.sub(r'\[/su_accordion\]', '</div>', content)

    # 12. [su_list ...]
    content = re.sub(r'\[su_list[^\]]*\]', '<div class="my-4 space-y-2 pl-3 border-l-3 border-brand-500/50">', content)
    content = re.sub(r'\[/su_list\]', '</div>', content)

    # Clean up generic shortcode tags
    content = re.sub(r'\[su_[^\]]+\]', '', content)
    content = re.sub(r'\[/su_[^\]]+\]', '', content)

    # Clean up URLs
    content = content.replace("https://mufettis.org/wp-content/", "/wp-content/")
    content = content.replace("http://mufettis.org/wp-content/", "/wp-content/")

    return content

processed_posts = []
for p in data["posts"]:
    question_counter = 0  # reset per post
    transformed_content = transform_shortcodes(p["content"], p["title"])
    
    clean_text = re.sub(r'<[^>]+>', ' ', transformed_content)
    words = len(clean_text.split())
    reading_time = max(1, round(words / 180))

    excerpt = p["seo"]["description"]
    if not excerpt:
        first_p = re.search(r'<p[^>]*>(.*?)</p>', transformed_content, re.DOTALL)
        if first_p:
            excerpt = re.sub(r'<[^>]+>', '', first_p.group(1))[:160] + "..."
        else:
            excerpt = clean_text[:160] + "..."

    # Ensure clean featured image path
    feat_img = p.get("featured_image")
    if feat_img:
        feat_img = re.sub(r'[^\x00-\x7F]+', '-', feat_img)
        feat_img = re.sub(r'-+', '-', feat_img)

    p_clean = dict(p)
    p_clean["content"] = transformed_content
    p_clean["reading_time"] = reading_time
    p_clean["word_count"] = words
    p_clean["excerpt"] = excerpt.strip()
    p_clean["featured_image"] = feat_img
    processed_posts.append(p_clean)

# Save posts.json
with open(os.path.join(SRC_DATA, "posts.json"), "w", encoding="utf-8") as f:
    json.dump(processed_posts, f, ensure_ascii=False, indent=2)

print(f"Generated {len(processed_posts)} posts with COMPLETE shortcode transformation!")
