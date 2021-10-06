export const hexToRgb = (color: string): number[] => {
    // #が先頭についてたら除去
    const replacedColor = color.replace(/#/g, '')

    return [
        parseInt(replacedColor.substr(0, 2), 16),
        parseInt(replacedColor.substr(2, 2), 16),
        parseInt(replacedColor.substr(4, 2), 16)
    ]
}