import sys
sys.stdout.reconfigure(encoding='utf-8')

path = r'c:\Users\vyasn\OneDrive\Desktop\project\bday\birthday-gift-spa\src\pages\Home.jsx'

with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i in range(390, min(416, len(lines))):
    print(f'{i}: {repr(lines[i])}')
