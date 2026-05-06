// Generates a real Shadow Blaster app icon (1024x1024, opaque, no alpha).
// Run: swift make-app-icon.swift <output-path>
import Foundation
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers
import CoreText

let size: CGFloat = 1024
let outPath = CommandLine.arguments.count > 1 ? CommandLine.arguments[1] : "AppIcon-1024.png"

let cs = CGColorSpace(name: CGColorSpace.sRGB)!
guard let ctx = CGContext(
    data: nil, width: Int(size), height: Int(size),
    bitsPerComponent: 8, bytesPerRow: 0, space: cs,
    bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue
) else { exit(1) }

// 1. Deep space gradient background (dark navy → near-black)
let gradColors = [
    CGColor(red: 0.04, green: 0.06, blue: 0.18, alpha: 1.0),
    CGColor(red: 0.01, green: 0.02, blue: 0.05, alpha: 1.0)
] as CFArray
let bgGrad = CGGradient(colorsSpace: cs, colors: gradColors, locations: [0, 1])!
ctx.drawLinearGradient(bgGrad,
                       start: CGPoint(x: 0, y: size),
                       end: CGPoint(x: size, y: 0),
                       options: [])

// 2. Distant nebula glow (soft radial — violet)
let violetGrad = CGGradient(colorsSpace: cs, colors: [
    CGColor(red: 0.56, green: 0.36, blue: 1.0, alpha: 0.55),
    CGColor(red: 0.56, green: 0.36, blue: 1.0, alpha: 0.0)
] as CFArray, locations: [0, 1])!
ctx.drawRadialGradient(violetGrad,
                       startCenter: CGPoint(x: size * 0.78, y: size * 0.22),
                       startRadius: 0,
                       endCenter: CGPoint(x: size * 0.78, y: size * 0.22),
                       endRadius: size * 0.45,
                       options: [])

// 3. Cyan accent glow
let cyanGrad = CGGradient(colorsSpace: cs, colors: [
    CGColor(red: 0.14, green: 0.85, blue: 1.0, alpha: 0.45),
    CGColor(red: 0.14, green: 0.85, blue: 1.0, alpha: 0.0)
] as CFArray, locations: [0, 1])!
ctx.drawRadialGradient(cyanGrad,
                       startCenter: CGPoint(x: size * 0.18, y: size * 0.78),
                       startRadius: 0,
                       endCenter: CGPoint(x: size * 0.18, y: size * 0.78),
                       endRadius: size * 0.4,
                       options: [])

// 4. Star field — random pinpricks of light
srand48(42)
ctx.setFillColor(CGColor(red: 1, green: 1, blue: 1, alpha: 1))
for _ in 0..<160 {
    let x = CGFloat(drand48()) * size
    let y = CGFloat(drand48()) * size
    let r = CGFloat(drand48()) * 1.6 + 0.5
    let alpha = CGFloat(drand48()) * 0.6 + 0.2
    ctx.setFillColor(CGColor(red: 1, green: 1, blue: 1, alpha: alpha))
    ctx.fillEllipse(in: CGRect(x: x - r, y: y - r, width: r * 2, height: r * 2))
}

// 5. Ring of light around the title
let center = CGPoint(x: size / 2.0, y: size / 2.0)
ctx.setStrokeColor(CGColor(red: 1, green: 0.21, blue: 0.37, alpha: 0.42))
ctx.setLineWidth(6)
ctx.strokeEllipse(in: CGRect(x: center.x - 380, y: center.y - 380, width: 760, height: 760))

ctx.setStrokeColor(CGColor(red: 0.14, green: 0.85, blue: 1.0, alpha: 0.32))
ctx.setLineWidth(3)
ctx.strokeEllipse(in: CGRect(x: center.x - 410, y: center.y - 410, width: 820, height: 820))

// 6. Stylized ship silhouette (triangle pointing up with glowing thrust)
ctx.saveGState()
ctx.translateBy(x: center.x, y: center.y - 60)

// Engine glow trail (behind ship)
let thrustGrad = CGGradient(colorsSpace: cs, colors: [
    CGColor(red: 0.14, green: 0.85, blue: 1.0, alpha: 0.95),
    CGColor(red: 0.56, green: 0.36, blue: 1.0, alpha: 0.4),
    CGColor(red: 0.56, green: 0.36, blue: 1.0, alpha: 0.0)
] as CFArray, locations: [0, 0.5, 1])!
ctx.drawRadialGradient(thrustGrad,
                       startCenter: CGPoint(x: 0, y: -150),
                       startRadius: 0,
                       endCenter: CGPoint(x: 0, y: -150),
                       endRadius: 220,
                       options: [])

// Ship body — pentagonal pixel-art shape
let shipPath = CGMutablePath()
shipPath.move(to: CGPoint(x: 0, y: 200))           // tip
shipPath.addLine(to: CGPoint(x: 130, y: 0))        // right shoulder
shipPath.addLine(to: CGPoint(x: 165, y: -130))     // right wing tip
shipPath.addLine(to: CGPoint(x: 70, y: -100))      // right wing inner
shipPath.addLine(to: CGPoint(x: 50, y: -180))      // right engine
shipPath.addLine(to: CGPoint(x: -50, y: -180))     // left engine
shipPath.addLine(to: CGPoint(x: -70, y: -100))     // left wing inner
shipPath.addLine(to: CGPoint(x: -165, y: -130))    // left wing tip
shipPath.addLine(to: CGPoint(x: -130, y: 0))       // left shoulder
shipPath.closeSubpath()

// Ship gradient fill
let shipGrad = CGGradient(colorsSpace: cs, colors: [
    CGColor(red: 1, green: 0.88, blue: 0.4, alpha: 1.0),
    CGColor(red: 1, green: 0.41, blue: 0.51, alpha: 1.0),
    CGColor(red: 0.72, green: 0.08, blue: 0.23, alpha: 1.0)
] as CFArray, locations: [0, 0.5, 1])!

ctx.addPath(shipPath)
ctx.clip()
ctx.drawLinearGradient(shipGrad,
                       start: CGPoint(x: 0, y: 200),
                       end: CGPoint(x: 0, y: -180),
                       options: [])

// Reset clip and outline the ship
ctx.restoreGState()
ctx.saveGState()
ctx.translateBy(x: center.x, y: center.y - 60)
ctx.addPath(shipPath)
ctx.setStrokeColor(CGColor(red: 1, green: 1, blue: 1, alpha: 0.92))
ctx.setLineWidth(8)
ctx.strokePath()

// Cockpit window (cyan dot)
ctx.setFillColor(CGColor(red: 0.14, green: 0.85, blue: 1.0, alpha: 1.0))
ctx.fillEllipse(in: CGRect(x: -28, y: 60, width: 56, height: 70))
ctx.setStrokeColor(CGColor(red: 1, green: 1, blue: 1, alpha: 0.95))
ctx.setLineWidth(3)
ctx.strokeEllipse(in: CGRect(x: -28, y: 60, width: 56, height: 70))

ctx.restoreGState()

// 7. "SB" monogram in the lower portion
let mono = "SB" as CFString
let monoFont = CTFontCreateWithName("Helvetica-Bold" as CFString, 220, nil)
let monoAttrs: [CFString: Any] = [
    kCTFontAttributeName: monoFont,
    kCTForegroundColorAttributeName: CGColor(red: 1, green: 0.88, blue: 0.4, alpha: 1.0)
]
let monoStr = CFAttributedStringCreate(nil, mono, monoAttrs as CFDictionary)!
let monoLine = CTLineCreateWithAttributedString(monoStr)
let monoBounds = CTLineGetImageBounds(monoLine, ctx)

// Subtle drop shadow for legibility
ctx.setShadow(offset: CGSize(width: 6, height: -6),
              blur: 12,
              color: CGColor(red: 0, green: 0, blue: 0, alpha: 0.7))
ctx.textPosition = CGPoint(x: center.x - monoBounds.midX,
                           y: 110 - monoBounds.minY)
CTLineDraw(monoLine, ctx)

// 8. Subtle vignette
ctx.setShadow(offset: .zero, blur: 0, color: nil)
let vignette = CGGradient(colorsSpace: cs, colors: [
    CGColor(red: 0, green: 0, blue: 0, alpha: 0.0),
    CGColor(red: 0, green: 0, blue: 0, alpha: 0.55)
] as CFArray, locations: [0.55, 1])!
ctx.drawRadialGradient(vignette,
                       startCenter: CGPoint(x: size / 2.0, y: size / 2.0),
                       startRadius: 0,
                       endCenter: CGPoint(x: size / 2.0, y: size / 2.0),
                       endRadius: size * 0.7,
                       options: [])

guard let img = ctx.makeImage() else { exit(2) }
let url = URL(fileURLWithPath: outPath)
guard let dest = CGImageDestinationCreateWithURL(url as CFURL,
                                                 UTType.png.identifier as CFString,
                                                 1, nil) else { exit(3) }
CGImageDestinationAddImage(dest, img, nil)
guard CGImageDestinationFinalize(dest) else { exit(4) }
print("Wrote \(outPath) (\(size)x\(size), opaque)")
