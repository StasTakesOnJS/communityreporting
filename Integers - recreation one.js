function listSquared(m, n) {
    let squaredPairs = [];
    for (let i=m;i<=n;i++) {
      let sumI = 0;

      for (let j=1;j<=i;j++) {
        if (i%j==0) {
          sumI+=j*j;
        }
      }

      if (Number.isInteger(Math.sqrt(sumI))) {
        squaredPairs.push([i,sumI]);
      }
    }
    return squaredPairs;
}
