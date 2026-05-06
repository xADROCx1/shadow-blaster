// Generates a 1024x1024 placeholder AppIcon. Replace with the real icon before submission.
// Usage: swift make-placeholder-icon.swift <output-path>
import Foundation
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers
import CoreText

let width = 1024
let height = 1024
let outPath = CommandLine.arguments.count > 1 ? CommandLine.arguments[1] : "AppIcon-1024.png"

let cs = CGColorSpace(name: CGColorSpace.sRGB)!
guard let ctx = CGContext(
    data: nil, width: width, height: height,
    bitsPerComponent: 8, bytesPerRow: 0, space: cs,
    bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
) else { exit(1) }

// Background: deep space gradient (approximated with two solid bands)
ctx.setFillColor(CGColor(red: 0.02, green: 0.03, blue: 0.075, alpha: 1))
ctx.fill(CGRect(x: 0, y: 0, width: width, height: height))
ctx.setFillColor(CGColor(red: 0.06, green: 0.08, blue: 0.18, alpha: 0.6))
ctx.fill(CGRect(x: 0, y: 0, width: width, height: height/2))

// Glow ring
let center = CGPoint(x: 512, y: 512)
ctx.setStrokeColor(CGColor(red: 0.14, green: 0.85, blue: 1.0, alpha: 0.55))
ctx.setLineWidth(8)
ctx.strokeEllipse(in: CGRect(x: center.x - 380, y: center.y - 380, width: 760, height: 760))

// Title text "SB"
let str = "SB" as CFString
let attrs: [CFString: Any] = [
    kCTFontAttributeName: CTFontCreateWithName("Helvetica-Bold" as CFString, 360, nil),
    kCTForegroundColorAttributeName: CGColor(red: 1, green: 0.88, blue: 0.4, alpha: 1)
]
let attr = CFAttributedStringCreate(nil, str, attrs as CFDictionary)!
let line = CTLineCreateWithAttributedString(attr)
let bounds = CTLineGetImageBounds(line, ctx)
ctx.textPosition = CGPoint(
    x: center.x - bounds.midX,
    y: center.y - bounds.midY
)
CTLineDraw(line, ctx)

guard let img = ctx.makeImage() else { exit(2) }
let url = URL(fileURLWithPath: outPath)
guard let dest = CGImageDestinationCreateWithURL(
    url as CFURL,
    UTType.png.identifier as CFString,
    1, nil
) else { exit(3) }
CGImageDestinationAddImage(dest, img, nil)
guard CGImageDestinationFinalize(dest) else { exit(4) }
print("Wrote \(outPath)")
