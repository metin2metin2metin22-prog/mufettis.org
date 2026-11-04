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

# 1. Extract snippet 185 from SQL if needed
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

    # Replace [wpcode id="185"]
    if '[wpcode id="185"]' in content or '[wpcode id=\'185\']' in content:
        content = content.replace('[wpcode id="185"]', snippet_185_content)
        content = content.replace('[wpcode id=\'185\']', snippet_185_content)

    def format_interactive_question(match):
        global question_counter
        question_counter += 1
        q_num = question_counter
        
        raw_title = match.group(1).strip()
        inner = match.group(2).strip()

        # Extract question number and topic from title
        clean_title = re.sub(r'^\d+[\.\-\)]\s*', '', raw_title)

        # Extract spoiler (correct answer & explanation)
        spoiler_match = re.search(r'\[su_spoiler\s+title="[^"]*"[^\]]*\](.*?)\[/su_spoiler\]', inner, re.DOTALL)
        
        correct_answer = "A"
        explanation_html = ""
        
        if spoiler_match:
            spoiler_text = spoiler_match.group(1).strip()
            
            # Find correct answer letter
            ans_match = re.search(r'Doğru Cevap:\s*([A-E])', spoiler_text, re.IGNORECASE)
            if ans_match:
                correct_answer = ans_match.group(1).upper()
            
            # Extract explanation after <hr />
            exp_parts = re.split(r'<hr\s*/?>', spoiler_text, maxsplit=1)
            if len(exp_parts) > 1:
                explanation_html = exp_parts[1].strip()
            else:
                explanation_html = re.sub(r'✅?\s*Doğru Cevap:\s*[A-E]', '', spoiler_text, flags=re.IGNORECASE).strip()
            
            # Clean inner to leave question text & options
            inner_without_spoiler = re.sub(r'\[su_spoiler\s+title="[^"]*"[^\]]*\].*?\[/su_spoiler\]', '', inner, flags=re.DOTALL).strip()
        else:
            inner_without_spoiler = inner

        # Parse options A), B), C), D), E)
        opt_pattern = re.compile(r'([A-E])\)\s*(.*?)(?=(?:[A-E]\)|\Z))', re.DOTALL)
        options = opt_pattern.findall(inner_without_spoiler)
        
        lead_text = ""
        first_opt_idx = inner_without_spoiler.find("A)")
        if first_opt_idx > 0:
            lead_text = inner_without_spoiler[:first_opt_idx].strip()

        options_html = ""
        if options:
            for letter, opt_text in options:
                opt_clean = opt_text.strip().replace("\n", "<br>")
                options_html += f'''
                <button type="button" 
                  class="quiz-option-btn group w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50/70 hover:bg-brand-50/50 dark:bg-slate-900/40 dark:hover:bg-brand-950/30 hover:border-brand-500 dark:hover:border-sky-500 transition-all duration-200 flex items-start gap-3.5 sm:gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500/40 relative overflow-hidden" 
                  data-option="{letter}">
                    <span class="option-badge inline-flex items-center justify-center w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 font-extrabold text-sm text-slate-700 dark:text-slate-300 group-hover:border-brand-500 group-hover:bg-brand-600 group-hover:text-white transition-all shrink-0 shadow-sm">
                        {letter}
                    </span>
                    <span class="option-text text-sm sm:text-[15px] text-slate-800 dark:text-slate-200 leading-relaxed pt-0.5 font-medium group-hover:text-slate-950 dark:group-hover:text-white">
                        {opt_clean}
                    </span>
                </button>
                '''
        else:
            options_html = f'<div class="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{inner_without_spoiler}</div>'

        return f'''
        <div class="interactive-quiz-card my-10 bg-white dark:bg-[#0c1827] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden" data-question-num="{q_num}" data-correct-answer="{correct_answer}">
            
            <!-- Top Card Header -->
            <div class="bg-gradient-to-r from-[#0b2b46] via-[#103a60] to-[#071d30] text-white px-5 sm:px-7 py-4.5 flex flex-wrap items-center justify-between gap-3 border-b border-brand-800/80">
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

            <!-- Body Area -->
            <div class="p-6 sm:p-8">
                
                <!-- Main Question Title / Scenario -->
                <div class="question-stem mb-6">
                    <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed tracking-tight">
                        {clean_title}
                    </h3>
                    {f'<div class="mt-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">{lead_text}</div>' if lead_text else ''}
                </div>

                <!-- Interactive Choices -->
                <div class="options-grid space-y-3">
                    {options_html}
                </div>

                <!-- Explanation & Solution Card -->
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

    # Apply interactive question card transformation
    content = re.sub(r'\[su_box\s+title="([^"]+)"[^\]]*\](.*?)\[/su_box\]', format_interactive_question, content, flags=re.DOTALL)

    # Standalone spoiler
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

    # Clean up generic shortcodes
    content = re.sub(r'\[su_[^\]]+\]', '', content)
    content = re.sub(r'\[/su_[^\]]+\]', '', content)

    # Clean up domain URLs to relative
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

print(f"Generated {len(processed_posts)} posts with elite interactive question UI!")
