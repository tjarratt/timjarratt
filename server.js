try {
	var express = require("express"),
	  	sys = require("util"),
      redis = require("redis").createClient(),
			app = express.createServer(express.compiler({src: __dirname, enable: ["sass"]})),
      fs = require('fs'),
      markdown = require('markdown').markdown,
      exec = require('child_process').exec;

  app.use(express.static(__dirname + "/public/"));

  app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  });
}
catch (e) {
  require("util").puts(e);
  require("util").puts("failed to start server.");
  process.exit(1);
}

app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.listen(8080);

app.get("/", function(request, response) {
  var now = new Date();
  sys.puts("got a visitor at ... " + now);

  response.render("index", {locals: {time: now.getTime()}});
});

app.get("/andy", function(req, res) {
  var now = new Date();
  res.render("andy.jade", {locals: {time: now.getTime()}});
});

app.get("/resume", function(request, response) {
  var now = new Date();
  response.render("resume.jade", {locals: {time: now.getTime()}});
});

app.get("/rsvp", function(req, res) {
  res.render("rsvp.jade", {});
});

app.get("/wedding", function(req, res) {
  res.redirect("http://illegaltoaster.com/rsvp");
});

app.get("/uptime", function(req, res) {
  redis.hgetall("rsvp", function(e, result) {
    res.json(true);
  });
});

function store_response(key, value) {
  redis.hset(key, value, new Date());
}

app.post("/submit/rsvp/:code", function(req, res) {
  sys.puts(req.connection.remoteAddress + " posted to rsvp at " + new Date());
  store_response("rsvp", req.params.code);
  res.json(true);
});

app.post("/submit/nogo/:name", function(req, res) {
  sys.puts(req.connection.remoteAddress + " posted to no_rsvp at " + new Date());
  store_response("no_rsvp", req.params.name);
  res.json(true);
});

fs.readdir(__dirname + '/blog', function(err, list) {
  list.forEach(function(file) {
    fs.readFile('blog/' + file, function(err, buffer) {
      var blog_entry = {name : file, content: buffer.utf8Slice()};
      app.get("/blog/" + file, function(req, res) {
        //todo: cache this content, reading from disk suucks
        res.render("blog.jade", {title: this.name, content: this.content});
      }.bind(blog_entry));

      app.get('/blog' + file + '/content', function(req, res) {
        res.json(this);
      }.bind(blog_entry));
    });
  });
});

app.get('/blog/recent', function(req, res) {
  exec('ls -t ' + __dirname + '/blog', function(err, out) {
    var files = out.split('\n');
    var entries = [];
    var expected = files.length;
    files.forEach(function(title) {
      fs.readFile('blog/' + title, function(err, buffer) {
        if (!title || title.length == 0) { expected -= 1; return; }

        console.log("fetched content for " + title);
        entries.push({title: title, content: markdown.toHTML(buffer.utf8Slice())});

        if (entries.length >= expected) {
          res.json(entries);
        }
      });
    });
  });
});

app.get("/blog", function(req, res) {
  res.render("blog_recent.jade", {});
});
