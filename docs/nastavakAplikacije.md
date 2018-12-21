### Removal the dependency of the server app.

* Html template
* `v5/app.js` routes changes
* Do notr forget to add 
~~~~//handle all the other reqs.
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});
~~~~
in the `v5/app.js`.
* 