try {
	var express = require("express"),
	  	sys = require("util"),
      redis = require("redis").createClient(),
			app = express.createServer(express.compiler({src: __dirname, enable: ["sass"]})),
      fs = require('fs'),
      jade = require('jade'),
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
  res.render("rsvp.jade", {layout: 'layout_base'});
});

app.get("/wedding", function(req, res) {
  res.redirect("http://illegaltoaster.com/rsvp");
});

app.get("/style_guide", function(req, res) {
  res.render("style_guide.jade", {layout: 'layout_base'});
});

app.get("/schedule", function(req, res) {
  res.render("schedule.jade", {layout: 'layout_base'});
});

app.get("/maps", function(req, res) {
  res.render("maps.jade", {layout: 'layout_base'});
});

app.get("/food", function(req, res) {
  res.render("food.jade", {layout: 'layout_base'});
});

app.get("/accommodations", function(req, res) {
  res.render("accommodations.jade", {layout: 'layout_base'});
});

app.get("/menu", function(req, res) {
  res.render("menu.jade", {layout: 'layout_base'});
});

app.get("/uptime", function(req, res) {
  redis.hgetall("rsvp", function(e, result) {
    res.json(true);
  });
});

app.get("/honey", function(req, res) {
  redis.hgetall("honey", function(e, result) {
    res.json(true);
  });
});

function store_response(key, value) {
  redis.hset(key, value, new Date());
}

var rsvp_codes = {
  "cdae5a" : "Robyn Beckwith & Ryan Thomas, 1914A Haste St, Berkeley CA 94704",
  "a513da" : "Andy Brown & Kate Zheng, 105 3rd Ave, San Francisco CA 94118",
  "72c92a" : "Lindsey Cook, 3337 Jansen Way, Vadnais Heights MN 55127",
  "9a2df2" : "Mari Cook, 902 Nancy Circle, Shoreview M",
  "338d35" : "Beth & Andrew Taylor, 8386 Hyde Ave S, Cottage Grove MN 55016",
  "597cb0" : "Brian Dobbs, 1836 E. 3rd St, St. Paul MN 55119",
  "84c72e" : "Marty & Colleen Dobbs, 8386 Hyde Ave S, Cottage Grove MN 55016",
  "14a4b4" : "Jody Dockter, 457 9th Ave S, South St. Paul MN 55075",
  "a0f7fc" : "Jacob Malick, 4924 Amber Valley Pkwy S, Apt 109, Fargo ND 5810",
  "242614" : "Brian Ganniger, 2147 Newhall St, Apt 725, Santa Clara CA 9505",
  "573328" : "Travis Grathwell & Lillie Chilen, 3009 Mission St, Apt 315, San Francisco CA 9411",
  "c1891d" : "Kateri Hunter, 8807 63rd Ave, Berwyn Heights M",
  "296ff4" : "Azver Hussain, 1170 Ogden St, Apt 405, Denver CO 8021",
  "7a5289" : "Nida & Farrah Hussain, 9126 Eden Oak Circle, Granite Bay CA 95746",
  "74feb2" : "Robert, Claire & Yia Yia, 3532 Redding St, Oakland C",
  "fcacc4" : "Amy Kruger, 1102 2nd St, Kenyon MN 55946",
  "998c04" : "Joe Marsano, 2348 42nd St, Sacramento CA 95817",
  "1da90e" : "Zac Morris & Lucia Solis, 1300 McAllister St, San Francisco CA 94115",
  "ac2b51" : "Oscar Najarro, 3775 Flora Vista Ave, Apt 505, Santa Clara CA 9505",
  "5c8747" : "Sue, Val & Nicole Kruger, 203 1st St NE, Morristown MN 5505",
  "cc35b6" : "Derrick Brandt, 708 12th Ave W, Apt 1, West Fargo ND 5807",
  "6b0c34" : "Pallavi Sistla, 2763 S Norfolk St, Apt 311, San Mateo CA 9440",
  "323e3c" : "Derrick Williams, 7430 157th St W, Unit 210, Apple Valley MN 5512",
  "b5a9ed" : "Fei Xie, 62 Sheridan, Apt 6, San Francisco CA 9410",
  "e01e23" : "Bob and Eileen Godwin, 3284 Kimberly Road, Cameron Park C",
  "0ec598" : "Mitch and Denielle Godwin, 4196 Fortuna Way, Salt Lake City Utah 84124",
  "c5c2ae" : "Scott and Nadine Godwin, 3472 Spring Creek Drive, Santa Rosa C",
  "26588d" : "Barbie and David Rhoades,104 Soule Ave, Pleasant Hill C",
  "917295" : "Barb Duckett & Ken, 438 Park Ave, Faribault MN 55021",
  "81584c" : "Andy and Kay DeMars,0834 Holiday Ave, Lakeville M",
  "df7b53" : "Jeff and Ellie DeMars, Box 134, Warsaw M",
  "cb94d7" : "Joe and Evon DeMars, 3850 Cobblestone Ln, Rochester M",
  "3117a6" : "Ernie and Debbie DeMars, 2396 Dalton Ave, Faribault MN 55021",
  "7582ef" : "Scott and Jini DeMars,2173 Glenview Dr., Milpitas C",
  "6a8ccc" : "Terry and Diane DeMars, 1205 Wellington Crescent, Faribault M",
  "969d66" : "Peter DeMars, 19 - 8th St NW, Faribault M",
  "6d1a2a" : "Chuck and Trish Kratt, 7007 24th St N, Oakdale MN 55128",
  "6dfaa5" : "Alice Godwin, 2717 Kelly St, Hayward C",
  "c2b954" : "Jim and Beth Godwin, PO Box 19192, Panama City Beach F",
  "14cb25" : "Nicole and Preston Hulgan, 7016 Starfish Ct, Panama City Beach FL 32407",
  "d31a5c" : "Terry and John*, 2658 Kelly St, Hayward C",
  "4d915e" : "Mary & Dima Abramenkof & Andrew Gade, 4744 Pauling Ave, San Diego C",
  "f36d19" : "Rafael Ornelas,1307 Kansas St,San Francisco CA 94107",
  "8c168d" : "Michael Glass,2 Dolores Terrace, San Francisco, CA 94110",
  "3df67b" : "Moshe + Jennifer Zadka, 1025 Foster City Blvd., Apt. C, Foster City, C",
  "ffe504" : "Dale Taylor,1298 Haight St Apt 10, San Francisco, C",
  "0e9815" : "John Egan,2 Townsend St #3-107,San Francisco CA 94107",
  "564069" : "Bonnie Sassor,12665 10th St S,Afton MN 55001,",
  "b10c70" : "Kim and John"
};

app.post("/submit/rsvp/:code", function(req, res) {
  try {
    if (req.params.code in rsvp_codes) {
      sys.puts(req.connection.remoteAddress + " posted to rsvp at " + new Date());
      store_response("rsvp", req.params.code);
      res.json(true, 200);
    }
    else {
      res.json(false);
    }
  }
  catch (e) {
    res.json(false);
  }
});

app.post("/submit/nogo/:name", function(req, res) {
  try {
    sys.puts(req.connection.remoteAddress + " posted to no_rsvp at " + new Date());
    store_response("no_rsvp", req.params.name);
    res.json(true, 200);
  }
  catch (e) {
   res.json(false);
  }
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

        entries.push({title: title, content: jade.compile(buffer.utf8Slice(), {})()});

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
