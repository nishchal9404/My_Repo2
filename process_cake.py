from PIL import Image
import numpy as np

img = Image.open(r'C:\Users\vyasn\OneDrive\Desktop\project\bday\Gemini_Generated_Image_1ezzfp1ezzfp1ezz.png').convert('RGBA')
data = np.array(img)

print('Shape:', data.shape)
print('Alpha range:', int(data[:,:,3].min()), int(data[:,:,3].max()))
print('Center pixel:', data[768,1408].tolist())
print('Top-left pixel:', data[5,5].tolist())
print('Bottom-center pixel:', data[1530,1408].tolist())

# Find the background color from corners
corners = [data[5,5], data[5,2810], data[1530,5], data[1530,2810]]
print('Corner pixels:', [c.tolist() for c in corners])

# Try to isolate cake - find pixels that differ significantly from corner bg
bg_color = data[5,5,:3].astype(float)
print('BG color:', bg_color)

diff = np.abs(data[:,:,:3].astype(float) - bg_color).max(axis=2)
print('Max diff range:', diff.min(), diff.max())

# Pixels that differ from bg by more than threshold = cake
threshold = 30
mask = diff > threshold

rows = np.any(mask, axis=1)
cols = np.any(mask, axis=0)

if rows.any() and cols.any():
    rmin, rmax = np.where(rows)[0][[0,-1]]
    cmin, cmax = np.where(cols)[0][[0,-1]]
    print(f'Cake bounds: rows {rmin}-{rmax}, cols {cmin}-{cmax}')
    print(f'Cake size: {cmax-cmin} x {rmax-rmin}')

    pad = 30
    rmin = max(0, rmin - pad)
    rmax = min(data.shape[0], rmax + pad)
    cmin = max(0, cmin - pad)
    cmax = min(data.shape[1], cmax + pad)

    cropped = img.crop((cmin, rmin, cmax, rmax))
    cropped_data = np.array(cropped)

    # Make background transparent
    bg = data[5,5,:3].astype(float)
    r,g,b = cropped_data[:,:,0].astype(float), cropped_data[:,:,1].astype(float), cropped_data[:,:,2].astype(float)
    dist = np.sqrt((r-bg[0])**2 + (g-bg[1])**2 + (b-bg[2])**2)
    cropped_data[:,:,3] = np.where(dist < 40, 0, 255).astype(np.uint8)

    result = Image.fromarray(cropped_data)
    out_path = r'C:\Users\vyasn\OneDrive\Desktop\project\bday\birthday-gift-spa\public\cake.png'
    result.save(out_path)
    print('Saved:', result.size, 'to', out_path)
else:
    print('No cake pixels found, saving full image with bg removed')
