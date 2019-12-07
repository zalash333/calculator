const CreateArrayHelper = (min = 1, max = 1, step = 1) => {
    let value = 0;
    let array = Array(max / min).fill(1);
    return array.map((el) => {
        value += step
        return value
    })
}

export default CreateArrayHelper;