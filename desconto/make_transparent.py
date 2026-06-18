from PIL import Image

img = Image.open('../ARQUIVOS TATO/Identidade visual/Logotipo/RGB-Digital/PNG/horizontal.png')
img = img.convert("RGBA")
datas = img.getdata()

bg_color = datas[0] # top-left pixel

newData = []
for item in datas:
    if abs(item[0] - bg_color[0]) < 30 and abs(item[1] - bg_color[1]) < 30 and abs(item[2] - bg_color[2]) < 30:
        newData.append((255, 255, 255, 0))
    else:
        # To avoid fringes, we could do more complex alpha blending, but this is a start
        newData.append(item)

img.putdata(newData)
img.save('assets/logo-transparent.png', 'PNG')
print("Done!")
