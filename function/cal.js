exports.up = (a, b) => {
    return (a + b)
}

exports.calTriangle = (height, width) => {
    return (height * width) / 2
}

exports.fetchSomeData = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve('success'), 2000)
    })
}

exports.login = async () => {
    const response = await exports.fetchSomeData()
    return response === 'success'
}