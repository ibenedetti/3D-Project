export const CANVAS_WIDTH = 1024
export const CANVAS_HEIGHT = 4096

const DARK_BROWN = '#2c1e16'
const RED = '#8b0000'
const GOLD = '#b8860b'
const FONT_MAIN = 'Macondo Swash Caps, cursive'

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ')
    let line = ''
    let currentY = y

    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' '
        const metrics = ctx.measureText(testLine)
        if (metrics.width > maxWidth && i > 0) {
            ctx.fillText(line, x, currentY)
            line = words[i] + ' '
            currentY += lineHeight
        } else {
            line = testLine
        }
    }
    ctx.fillText(line, x, currentY)
    return currentY + lineHeight
}

function drawDivider(ctx, y) {
    ctx.strokeStyle = GOLD
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(40, y)
    ctx.lineTo(CANVAS_WIDTH - 40, y)
    ctx.stroke()
}

function drawDropCap(ctx, letter, x, y) {
    ctx.save()
    ctx.font = `bold 80px ${FONT_MAIN}`
    ctx.fillStyle = RED
    ctx.strokeStyle = RED
    ctx.lineWidth = 2

    const size = 80
    ctx.strokeRect(x, y - size + 10, size * 0.7, size)
    ctx.fillText(letter, x + 6, y + 6)
    ctx.restore()
    return x + size * 0.7 + 12 
}

function drawPostMeta(ctx, text, y) {
    ctx.save()
    ctx.font = `italic 22px ${FONT_MAIN}`
    ctx.fillStyle = DARK_BROWN
    ctx.globalAlpha = 0.75
    ctx.fillText(text, 60, y)
    ctx.restore()
    return y + 34
}

function drawBodyText(ctx, text, y, maxWidth) {
    ctx.save()
    ctx.font = `26px ${FONT_MAIN}`
    ctx.fillStyle = DARK_BROWN
    const finalY = wrapText(ctx, text, 60, y, maxWidth, 36)
    ctx.restore()
    return finalY + 10
}

function drawComment(ctx, author, text, y, maxWidth, color = DARK_BROWN) {
    ctx.save()
    ctx.fillStyle = GOLD
    ctx.fillRect(60, y - 20, 4, 60)

    ctx.font = `bold 22px ${FONT_MAIN}`
    ctx.fillStyle = color
    ctx.fillText(author, 74, y)

    ctx.font = `22px ${FONT_MAIN}`
    ctx.fillStyle = DARK_BROWN
    const finalY = wrapText(ctx, text, 74, y + 28, maxWidth - 74, 28)
    ctx.restore()
    return finalY + 16
}

function drawPostBackground(ctx, y, height) {
    ctx.save()
    ctx.globalCompositeOperation = 'destination-over' 
    ctx.fillStyle = 'rgba(44, 30, 22, 0.07)'
    ctx.strokeStyle = 'rgba(44, 30, 22, 0.2)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.roundRect(20, y, CANVAS_WIDTH - 40, height, 6)
    ctx.fill()
    ctx.stroke()
    ctx.restore()
}

function drawImage(ctx, img, x, y, width, height) {
    if (!img || !img.complete) return
    ctx.save()
    ctx.drawImage(img, x, y, width, height)
    ctx.restore()
}


function drawHeader(ctx) {
    ctx.save()
    ctx.font = `bold 72px ${FONT_MAIN}`
    ctx.fillStyle = RED
    ctx.textAlign = 'center'
    ctx.fillText('VisageScroll', CANVAS_WIDTH / 2, 90)

    ctx.strokeStyle = DARK_BROWN
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(40, 106)
    ctx.lineTo(CANVAS_WIDTH - 40, 106)
    ctx.stroke()
    ctx.textAlign = 'left'
    ctx.restore()
}

function drawPost1(ctx, images, startY) {
    const PAD = 60
    const maxW = CANVAS_WIDTH - PAD * 2
    let y = startY + 20

    y = drawPostMeta(ctx, 'Sent via Raven by Lady Elara of the Vale', y)
    const afterCap = drawDropCap(ctx, 'T', PAD, y + 50)
    
    ctx.save()
    ctx.font = `bold 38px ${FONT_MAIN}`
    ctx.fillStyle = DARK_BROWN
    const titleText = 'o the "Friend" who poisoned my favorite hunting hound...'
    wrapText(ctx, titleText, afterCap, y + 10, maxW - afterCap + PAD, 46)
    ctx.restore()
    y += 110

    drawImage(ctx, images.hound, PAD, y, 300, 200)
    y += 220

    y = drawBodyText(ctx, 'I saw you lurking by the kennels with that suspicious vial of nightshade. The King shall hear of this! Our alliance is severed as cleanly as a head on the block.', y, maxW)
    y = drawComment(ctx, 'Lord Cedric:', 'Elara, it was merely a sedative! He would not stop barking at the moon!', y, maxW)
    y = drawComment(ctx, 'Lady Elara:', 'SEE YOU AT THE TOURNEY...', y, maxW, RED)

    const finalY = y + 30
    drawPostBackground(ctx, startY, finalY - startY) 
    return finalY
}

function drawPost2(ctx, images, startY) {
    const PAD = 60
    const maxW = CANVAS_WIDTH - PAD * 2
    let y = startY + 20

    drawPostBackground(ctx, startY, 500)

    ctx.save()
    ctx.font = `bold 24px ${FONT_MAIN}`
    ctx.fillStyle = RED
    ctx.fillText('🚨 SCANDAL AT THE ABBEY 🚨', PAD, y)
    ctx.restore()
    y += 40

    const afterCap = drawDropCap(ctx, 'W', PAD, y + 50)
    ctx.save()
    ctx.font = `bold 38px ${FONT_MAIN}`
    ctx.fillStyle = DARK_BROWN
    wrapText(ctx, 'ho was the chivalrous Knight in the Silver Helm?', afterCap, y + 10, maxW - afterCap + PAD, 46)
    ctx.restore()
    y += 110

    drawImage(ctx, images.knight, PAD, y, 300, 200)
    y += 220

    y = drawBodyText(ctx, 'Spotted: The Princess\'s handmaiden meeting a mysterious knight behind the dragon stables. They weren\'t discussing "diplomacy," if you catch my drift.', y, maxW)
    y = drawComment(ctx, 'The Jester:', 'I have the sketches! Only V gold pieces per copy!', y, maxW)

    return y + 30
}

function drawPost3(ctx, startY) {
    const PAD = 60
    const maxW = CANVAS_WIDTH - PAD * 2
    let y = startY + 20

    drawPostBackground(ctx, startY, 300)
    y = drawPostMeta(ctx, 'Posted by Barnaby the Blacksmith', y)

    const afterCap = drawDropCap(ctx, 'A', PAD, y + 50)
    ctx.save()
    ctx.font = `bold 38px ${FONT_MAIN}`
    ctx.fillStyle = DARK_BROWN
    wrapText(ctx, 'nnouncement: I am no longer sharpening swords for the House of York.', afterCap, y + 10, maxW - afterCap + PAD, 46)
    ctx.restore()
    y += 110

    y = drawBodyText(ctx, 'Payment in "exposure" doesn\'t buy grain for my children, you aristocratic leeches. From now on, pay in coin or fight with blunt spoons.', y, maxW)

    return y + 30
}

function drawPost4(ctx, images, startY) {
    const PAD = 60
    const maxW = CANVAS_WIDTH - PAD * 2
    let y = startY + 20

    drawPostBackground(ctx, startY, 560)
    y = drawPostMeta(ctx, 'Sent via Raven by Lady Elara of the Vale', y)

    const afterCap = drawDropCap(ctx, 'L', PAD, y + 50)
    ctx.save()
    ctx.font = `bold 38px ${FONT_MAIN}`
    ctx.fillStyle = DARK_BROWN
    wrapText(ctx, 'ost: One fire-breathing nuisance.', afterCap, y + 10, maxW - afterCap + PAD, 46)
    ctx.restore()
    y += 100

    drawImage(ctx, images.dragon, PAD, y, 300, 200)
    y += 220

    y = drawBodyText(ctx, 'Ignis has escaped the courtyard again. If you see scorched sheep or a glowing horizon to the West, please notify the stables. Do not approach with shiny armor — he thinks you are a snack in a wrapper.', y, maxW)
    y = drawComment(ctx, 'Shepherd Thom:', 'He ate three of my prize rams! Send gold or I\'m calling the Dragonslayer!', y, maxW)
    y = drawComment(ctx, 'Sir Gawain:', 'Check your DMs (Direct Messengers), Thom. I\'ll send a cart of ale.', y, maxW)

    return y + 30
}

function drawPost5(ctx, startY) {
    const PAD = 60
    const maxW = CANVAS_WIDTH - PAD * 2
    let y = startY + 20

    drawPostBackground(ctx, startY, 380)
    y = drawPostMeta(ctx, 'Channeled by Zalthar the Grey', y)

    const afterCap = drawDropCap(ctx, 'U', PAD, y + 50)
    ctx.save()
    ctx.font = `bold 38px ${FONT_MAIN}`
    ctx.fillStyle = DARK_BROWN
    wrapText(ctx, 'npopular Opinion: Potions are a scam.', afterCap, y + 10, maxW - afterCap + PAD, 46)
    ctx.restore()
    y += 100

    y = drawBodyText(ctx, 'I spent XL silver pieces on a "Levitation Brew" at the apothecary yesterday. All it did was give me horrific flatulence and a mild rash. Support your local sorcerers, not these high-street herbalist frauds!', y, maxW)
    y = drawComment(ctx, 'Apothecary Al:', 'You didn\'t shake the vial, Zalthar. Read the runes on the label next time!', y, maxW)

    return y + 30
}

function drawPost6(ctx, images, startY) {
    const PAD = 60
    const maxW = CANVAS_WIDTH - PAD * 2
    let y = startY + 20

    drawPostBackground(ctx, startY, 520)
    y = drawPostMeta(ctx, 'Posted by Merchant Martha', y)

    const afterCap = drawDropCap(ctx, 'T', PAD, y + 50)
    ctx.save()
    ctx.font = `bold 38px ${FONT_MAIN}`
    ctx.fillStyle = DARK_BROWN
    wrapText(ctx, 'he audacity of the Guild of Cobblers...', afterCap, y + 10, maxW - afterCap + PAD, 46)
    ctx.restore()
    y += 100

    drawImage(ctx, images.market, PAD, y, 300, 200)
    y += 220

    y = drawBodyText(ctx, 'Just witnessed a man try to trade a "magic" bean for a pair of genuine leather boots. This isn\'t a fairy tale, Jack! I only accept gold, silver, or exceptionally plump poultry. #MarketLife #NoCredit', y, maxW)
    y = drawComment(ctx, 'The Jester:', 'To be fair, those boots were so last season, Martha.', y, maxW)

    return y + 30
}

function drawDecree(ctx, startY) {
    const PAD = 60
    const maxW = CANVAS_WIDTH - PAD * 2
    let y = startY + 30

    ctx.save()
    ctx.strokeStyle = DARK_BROWN
    ctx.lineWidth = 4
    ctx.strokeRect(20, startY, CANVAS_WIDTH - 40, 260)
    ctx.restore()

    ctx.save()
    ctx.font = `bold 42px ${FONT_MAIN}`
    ctx.fillStyle = DARK_BROWN
    ctx.textAlign = 'center'
    ctx.fillText('OFFICIAL DECREE', CANVAS_WIDTH / 2, y + 40)
    ctx.textAlign = 'left'
    ctx.restore()
    y += 80

    ctx.save()
    ctx.font = `26px ${FONT_MAIN}`
    ctx.fillStyle = DARK_BROWN
    ctx.textAlign = 'center'
    wrapText(ctx, 'All subjects are required to "Like" the King\'s new portrait by sunset or face the dungeon. Execution is scheduled for tomorrow for all non-followers.', CANVAS_WIDTH / 2, y, maxW, 34)
    ctx.textAlign = 'left'
    ctx.restore()
}


export function drawScrollContent(ctx, images, scrollY) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    if (images.papyrus) {
        const pat = ctx.createPattern(images.papyrus, 'repeat')
        ctx.fillStyle = pat
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    } else {
        ctx.fillStyle = '#f5e6c8'
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    }

    ctx.save()
    ctx.translate(0, -scrollY + 100)

    drawHeader(ctx)
    drawDivider(ctx, 115)

    let y = 160 
    y = drawPost1(ctx, images, y)
    drawDivider(ctx, y)
    y += 20

    y = drawPost2(ctx, images, y)
    drawDivider(ctx, y)
    y += 20

    y = drawPost3(ctx, y)
    drawDivider(ctx, y)
    y += 20

    y = drawPost4(ctx, images, y)
    drawDivider(ctx, y)
    y += 20

    y = drawPost5(ctx, y)
    drawDivider(ctx, y)
    y += 20

    y = drawPost6(ctx, images, y)
    drawDivider(ctx, y)
    y += 30

    drawDecree(ctx, y)

    ctx.restore()
}
