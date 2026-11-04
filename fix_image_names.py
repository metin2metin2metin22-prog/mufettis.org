import os
import re
import json

root = r"C:\Users\metin\.gemini\antigravity\scratch\mufettis.org\public\wp-content\uploads"
posts_json_path = r"C:\Users\metin\.gemini\antigravity\scratch\mufettis.org\src\data\posts.json"

name_mapping = {}

# 1. Rename files on disk
for dirpath, dirnames, filenames in os.walk(root):
    for f in filenames:
        if not f.isascii():
            # Replace non-ascii chars with hyphen
            clean_name = re.sub(r'[^\x00-\x7F]+', '-', f)
            clean_name = re.sub(r'-+', '-', clean_name).strip('-')
            
            old_full = os.path.join(dirpath, f)
            new_full = os.path.join(dirpath, clean_name)
            
            # Map relative path
            rel_dir = os.path.relpath(dirpath, r"C:\Users\metin\.gemini\antigravity\scratch\mufettis.org\public").replace('\\', '/')
            old_web = f"/{rel_dir}/{f}"
            new_web = f"/{rel_dir}/{clean_name}"
            name_mapping[old_web] = new_web
            
            if not os.path.exists(new_full):
                os.rename(old_full, new_full)
            else:
                try:
                    os.remove(old_full)
                except:
                    pass

print(f"Renamed {len(name_mapping)} files.")

# 2. Update posts.json
with open(posts_json_path, "r", encoding="utf-8") as f:
    posts = json.load(f)

for p in posts:
    img = p.get("featured_image")
    if img:
        # Check direct mapping
        if img in name_mapping:
            p["featured_image"] = name_mapping[img]
        else:
            # Check non-ascii replacement
            clean_img = re.sub(r'[^\x00-\x7F]+', '-', img)
            clean_img = re.sub(r'-+', '-', clean_img)
            p["featured_image"] = clean_img

    # Also update any references in content
    content = p.get("content", "")
    for old_url, new_url in name_mapping.items():
        if old_url in content:
            content = content.replace(old_url, new_url)
    
    # Generic clean up in content
    p["content"] = content

with open(posts_json_path, "w", encoding="utf-8") as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)

print("Updated posts.json successfully!")
