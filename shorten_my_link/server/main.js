import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links';
import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish('links', function () {
    return Links.find({});
  });
});

function onRoute (req, res, next) {
  // take the token from the url
  // match link in the Links Collection
  const link = Links.findOne({ token: req.params.token });

  if (link) {
    // if found, send to url
    Links.update(link, { $inc: { clicks: 1 } } );
    res.writeHead(307, { 'Location': link.url });
    res.end();
  } else {
    // if not found, send to home
    next();
  }


}

// / NO Match
// /books/harry_potter NO Match
// /abcd MATCH!!
const middleware = ConnectRoute(function(router) {
  router.get('/:token', onRoute);
})

WebApp.connectHandlers.use(middleware);
