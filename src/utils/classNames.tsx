

const ClassNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ');
}

export default ClassNames;
