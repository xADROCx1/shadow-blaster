// High-quality 2x upscale of an icon using Lanczos.
// Usage: swift upscale-icon.swift <in> <out>
import Foundation
import CoreImage
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers

guard CommandLine.arguments.count >= 3 else {
    print("Usage: upscale-icon.swift <input> <output>")
    exit(1)
}
let inPath = CommandLine.arguments[1]
let outPath = CommandLine.arguments[2]

guard let inputImage = CIImage(contentsOf: URL(fileURLWithPath: inPath)) else {
    print("Could not load \(inPath)")
    exit(2)
}

let target: CGFloat = 1024
let inputW = inputImage.extent.width
let scale = target / inputW

let filter = CIFilter(name: "CILanczosScaleTransform")!
filter.setValue(inputImage, forKey: kCIInputImageKey)
filter.setValue(scale, forKey: kCIInputScaleKey)
filter.setValue(1.0, forKey: kCIInputAspectRatioKey)

guard let scaled = filter.outputImage else {
    print("Filter failed")
    exit(3)
}

let ctx = CIContext()
guard let cg = ctx.createCGImage(scaled, from: CGRect(x: 0, y: 0, width: target, height: target)) else {
    print("Could not render CGImage")
    exit(4)
}

// Composite onto opaque black canvas to guarantee no alpha
let cs = CGColorSpace(name: CGColorSpace.sRGB)!
guard let opaqueCtx = CGContext(
    data: nil,
    width: Int(target), height: Int(target),
    bitsPerComponent: 8, bytesPerRow: 0,
    space: cs,
    bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue
) else { exit(5) }
opaqueCtx.setFillColor(CGColor(red: 0, green: 0, blue: 0, alpha: 1))
opaqueCtx.fill(CGRect(x: 0, y: 0, width: target, height: target))
opaqueCtx.draw(cg, in: CGRect(x: 0, y: 0, width: target, height: target))

guard let final = opaqueCtx.makeImage() else { exit(6) }
let url = URL(fileURLWithPath: outPath)
guard let dest = CGImageDestinationCreateWithURL(url as CFURL, UTType.png.identifier as CFString, 1, nil) else { exit(7) }
CGImageDestinationAddImage(dest, final, nil)
guard CGImageDestinationFinalize(dest) else { exit(8) }
print("Wrote \(outPath) (1024x1024, opaque)")
