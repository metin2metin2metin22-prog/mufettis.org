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

# 1. Extract snippet 185 from SQL
snippet_185_content = ""
with open(SQL_PATH, "r", encoding="utf-8", errors="replace") as f:
    sql = ''.join(f.readlines()[39563:40011])

m185 = re.search(r'\(185,\d+,\'[^\']*\',\'[^\']*\',((?:\'[^\']*(?:\\\'[^\']*)*\'|NULL)),\'((?:\\\'|[^\'])*)\'', sql)
if m185:
    raw = m185.group(1)
    if raw.startswith("'") and raw.endswith("'"):
        raw = raw[1:-1]
    snippet_185_content = raw.replace(r"\'", "'").replace(r'\"', '"').replace(r"\r\n", "\n").replace(r"\n", "\n")
    print(f"Extracted snippet 185 ({len(snippet_185_content)} chars)")

# 2. Load extracted_content.json
with open(JSON_PATH, "r", encoding="utf-8") as f:
    data = json.load(f)

def transform_shortcodes(content):
    # Replace [wpcode id="185"]
    if '[wpcode id="185"]' in content or '[wpcode id=\'185\']' in content:
        content = content.replace('[wpcode id="185"]', snippet_185_content)
        content = content.replace('[wpcode id=\'185\']', snippet_185_content)

    # Transform su_box with su_spoiler inside
    def replace_su_box(match):
        title = match.group(1).strip()
        inner = match.group(2).strip()

        # Check for spoiler inside
        spoiler_match = re.search(r'\[su_spoiler\s+title=\"([^\"]+)\"[^\]]*\](.*?)\[/su_spoiler\]', inner, re.DOTALL)
        if spoiler_match:
            spoiler_title = spoiler_match.group(1).strip()
            spoiler_content = spoiler_match.group(2).strip()
            # remove spoiler from question body
            question_body = re.sub(r'\[su_spoiler\s+title=\"[^\"]+\"[^\]]*\].*?\[/su_spoiler\]', '', inner, flags=re.DOTALL).strip()
            
            return f'''
            <div class="question-card my-8 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
                <div class="bg-gradient-to-r from-brand-900 to-brand-800 text-white px-5 py-4 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand-700 text-amber-300 text-sm font-bold shadow-inner">?</span>
                        <h4 class="font-semibold text-base sm:text-lg text-white leading-snug">{title}</h4>
                    </div>
                    <span class="text-xs bg-brand-700/60 text-slate-200 px-2.5 py-1 rounded-full uppercase tracking-wider font-medium">Soru</span>
                </div>
                <div class="p-6">
                    <div class="question-body text-slate-800 dark:text-slate-200 text-base leading-relaxed mb-6 font-normal">
                        {question_body}
                    </div>
                    <details class="solution-details group border-t border-slate-100 dark:border-slate-700/80 pt-4 mt-2">
                        <summary class="cursor-pointer select-none list-none flex items-center justify-between py-2.5 px-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 text-brand-700 dark:text-brand-300 font-medium transition-colors">
                            <span class="flex items-center gap-2">
                                <svg class="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span>{spoiler_title}</span>
                            </span>
                            <span class="transform transition-transform duration-200 group-open:rotate-180">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </span>
                        </summary>
                        <div class="solution-content mt-4 p-5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base">
                            {spoiler_content}
                        </div>
                    </details>
                </div>
            </div>
            '''
        else:
            return f'''
            <div class="content-box my-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <h4 class="font-bold text-slate-900 dark:text-white mb-3 text-lg">{title}</h4>
                <div class="text-slate-700 dark:text-slate-300 leading-relaxed">{inner}</div>
            </div>
            '''

    content = re.sub(r'\[su_box\s+title=\"([^\"]+)\"[^\]]*\](.*?)\[/su_box\]', replace_su_box, content, flags=re.DOTALL)
    
    # Standalone su_spoiler
    def replace_standalone_spoiler(match):
        title = match.group(1).strip()
        inner = match.group(2).strip()
        return f'''
        <details class="group my-4 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
            <summary class="cursor-pointer select-none list-none flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 text-brand-700 dark:text-brand-300 font-semibold">
                <span>{title}</span>
                <span class="transform transition-transform duration-200 group-open:rotate-180">▼</span>
            </summary>
            <div class="p-4 border-t border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 leading-relaxed">
                {inner}
            </div>
        </details>
        '''
    content = re.sub(r'\[su_spoiler\s+title=\"([^\"]+)\"[^\]]*\](.*?)\[/su_spoiler\]', replace_standalone_spoiler, content, flags=re.DOTALL)

    # Clean up generic remaining shortcodes
    content = re.sub(r'\[su_[^\]]+\]', '', content)
    content = re.sub(r'\[/su_[^\]]+\]', '', content)

    # Replace old absolute domain URLs to relative
    content = content.replace("https://mufettis.org/wp-content/", "/wp-content/")
    content = content.replace("http://mufettis.org/wp-content/", "/wp-content/")

    return content

processed_posts = []
for p in data["posts"]:
    transformed_content = transform_shortcodes(p["content"])
    
    # Calculate reading time (avg 180 words per min for Turkish technical material)
    clean_text = re.sub(r'<[^>]+>', ' ', transformed_content)
    words = len(clean_text.split())
    reading_time = max(1, round(words / 180))

    # Clean excerpt
    excerpt = p["seo"]["description"]
    if not excerpt:
        first_p = re.search(r'<p[^>]*>(.*?)</p>', transformed_content, re.DOTALL)
        if first_p:
            excerpt = re.sub(r'<[^>]+>', '', first_p.group(1))[:160] + "..."
        else:
            excerpt = clean_text[:160] + "..."

    p_clean = dict(p)
    p_clean["content"] = transformed_content
    p_clean["reading_time"] = reading_time
    p_clean["word_count"] = words
    p_clean["excerpt"] = excerpt.strip()
    processed_posts.append(p_clean)

# Save posts.json
with open(os.path.join(SRC_DATA, "posts.json"), "w", encoding="utf-8") as f:
    json.dump(processed_posts, f, ensure_ascii=False, indent=2)

# Save categories.json with post counts
categories_map = {}
for c in data["categories"]:
    c_slug = c["slug"]
    if c_slug not in categories_map:
        categories_map[c_slug] = {
            "name": c["name"],
            "slug": c_slug,
            "count": 0
        }

for p in processed_posts:
    for cat in p.get("categories", []):
        slug = cat["slug"]
        if slug in categories_map:
            categories_map[slug]["count"] += 1
        else:
            categories_map[slug] = {
                "name": cat["name"],
                "slug": slug,
                "count": 1
            }

categories_list = sorted(list(categories_map.values()), key=lambda x: x["count"], reverse=True)
with open(os.path.join(SRC_DATA, "categories.json"), "w", encoding="utf-8") as f:
    json.dump(categories_list, f, ensure_ascii=False, indent=2)

print(f"Processed {len(processed_posts)} posts and {len(categories_list)} categories successfully!")
