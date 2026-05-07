// Normalize a screenshot for App Store Connect:
//   - Strip alpha (composite onto opaque black)
//   - Resize to target dimensions while preserving aspect (letterbox if needed)
//   - Output 72-DPI sRGB PNG
//
// Usage: swift normalize-screenshot.swift <in> <out> <targetW> <targetH>
import Foundation
import CoreImage
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers

guard CommandLine.arguments.count >= 5 else {
    print("Usage: normalize-screenshot.swift <in> <out> <W> <H>")
    exit(1)
}
let inPath = CommandLine.arguments[1]
let outPath = CommandLine.arguments[2]
let targetW = CGFloat(Int(CommandLine.arguments[3])!)
let targetH = CGFloat(Int(CommandLine.arguments[4])!)

guard let src = CIImage(contentsOf: URL(fileURLWithPath: inPath)) else {
    print("Could not load \(inPath)"); exit(2)
}
let srcW = src.extent.width
let srcH = src.extent.height

// Aspect-preserving fit (cover or contain). We pick CONTAIN to avoid cropping
// content; Apple is fine with very small letterbox bars matching the game's
// dark space aesthetic.
let scale = min(targetW / srcW, targetH / srcH)
let scaledW = srcW * scale
let scaledH = srcH * scale

let scaler = CIFilter(name: "CILanczosScaleTransform")!
scaler.setValue(src, forKey: kCIInputImageKey)
scaler.setValue(scale, forKey: kCIInputScaleKey)
scaler.setValue(1.0, forKey: kCIInputAspectRatioKey)
guard let scaled = scaler.outputImage else { print("Scale failed"); exit(3) }

let cs = CGColorSpace(name: CGColorSpace.sRGB)!
guard let ctx = CGContext(
    data: nil,
    width: Int(targetW), height: Int(targetH),
    bitsPerComponent: 8, bytesPerRow: 0, space: cs,
    bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue
) else { exit(4) }
// Opaque black canvas (matches the game's dark space background)
ctx.setFillColor(CGColor(red: 0.02, green: 0.027, blue: 0.075, alpha: 1))
ctx.fill(CGRect(x: 0, y: 0, width: targetW, height: targetH))

let ciCtx = CIContext()
guard let scaledCG = ciCtx.createCGImage(
    scaled,
    from: CGRect(x: 0, y: 0, width: scaledW, height: scaledH)
) else { exit(5) }

let xOffset = (targetW - scaledW) / 2.0
let yOffset = (targetH - scaledH) / 2.0
ctx.draw(scaledCG, in: CGRect(x: xOffset, y: yOffset, width: scaledW, height: scaledH))

guard let final = ctx.makeImage() else { exit(6) }

let url = URL(fileURLWithPath: outPath)
guard let dest = CGImageDestinationCreateWithURL(
    url as CFURL,
    UTType.png.identifier as CFString,
    1, nil
) else { exit(7) }
let opts: [CFString: Any] = [
    kCGImagePropertyDPIWidth: 72,
    kCGImagePropertyDPIHeight: 72
]
CGImageDestinationAddImage(dest, final, opts as CFDictionary)
guard CGImageDestinationFinalize(dest) else { exit(8) }
print("Wrote \(outPath) (\(Int(targetW))x\(Int(targetH)), opaque, sRGB, 72dpi)")
