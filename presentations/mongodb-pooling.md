Our problem
========

We've been [following instructions][1] without understanding.

We've been opening connections, but not closing them.

!

    mongodb.connect(dbconn.connectURL(config), 
      function(err, conn) {
        // ...
            conn.collection(collname, 
              function(err, collection) {
                // ...
                    collection.find(query, params) // ...
                      // Last thing is a callback out!
                        callback(err, items);
                    });

Uh… where is the close?

!

What To Do?
========

  1. Open up a Pool of Connections
  2. Close them when our server ends
  3. Re-use these pools

**Note:** The MongoDB driver can give us *connection pools* 

!

Define Options
==========

    var serverOptions = {
      'auto_reconnect': true,
      'poolSize': 5
    };

**Note:** The `poolSize` as an option.

!

Create Server
=========
 
Pass in our options.

    var serv = new mongodb.Server('localhost', 
                       27017, serverOptions);

**Note:** At this point, there is no connection made to the server.

!

Question? 
======

Does it take a Cloud Foundry URL?

No…

!

Create Manager
==========

    var dbManager = 
        new mongodb.Db('myDB', serv);

Takes the `serv` variable and a database name.

!

Open Connections
===========

    dbManager.open(function (error, db) {

        // The db variable is now a pool
        // Store this and reuse it.
    });

Yes, this finally connects to the database.

!

Close Connections
===========

When the server is done, we need to close the connections with the `db` variable, we got from the `open()` function.

!

Connect URL?
=============

Seems that only the `connect()` method takes a URL.

However, it is part of `Db` and also takes some options.

!

Connect Options
==========

  * `options.server`
  * `options.db`

See these [online details][2].

!

Db Object
======

The `Db()` takes the following options:

 * `databaseName` - name of the database.
 * `serverConfig` - server config object.
 * `options` - additional options for the collection.

!

Summary
======

The `mongodb.connect()` must have some `options`.

This `connect()` is only called once.

The `db` instance that comes back in the callback, *must be reused*.

!

Server Options
=========

    var options = {
        server : {
            'auto_reconnect': true,
            'poolSize': 5
        }
    };

!

Server Connection
=========

    mongodb.connect( connectionURL(), options, 
        function (error, db) {
            // This `db` must be reused!
        });

!

  [1]: http://blog.mongodb.org/post/6587009156/cloudfoundry-mongodb-and-nodejs
  [2]: https://github.com/christkv/node-mongodb-native/blob/master/docs/database.md
