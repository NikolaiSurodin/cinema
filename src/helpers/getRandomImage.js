export const getRandomImage = function () {
    const bgImages = [ 'bg1', 'bg2', 'bg3' ]
    return bgImages[ Math.floor( Math.random() * bgImages.length ) ]
}