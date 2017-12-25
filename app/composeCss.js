function importAll (r) {
  r.keys().forEach(r);
}

importAll(require.context('././', true, /\.scss$/));
// importAll(require.context('././', true, /\.css$/));

require('./styles/bootstrap.css');
