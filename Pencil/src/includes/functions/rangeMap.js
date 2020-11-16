function rangeMap ([minFrom, maxFrom], [minTo, maxTo], iPointFrom) {
    return minTo + (((iPointFrom - minFrom) * (maxTo - minTo)) / (maxFrom - minFrom));
}

module.exports = rangeMap;
