Envelopes = new Meteor.Collection("envelope");

Envelopes.allow({
    insert: function (userId, doc) {
        return (userId && doc.owner === Meteor.userId() &&
                (Roles.userIsInRole(userId, "admin")) || Roles.userIsInRole(userId, "normal"));
    },
    remove: function (userId, doc) {
        var demand = Demands.findOne({envelope: doc});
        return demand == null && doc.owner === userId;
    }
});

Envelope = function (name, owner) {
    this._name = name;
    this._owner = owner;
};

Envelope.prototype = {
    get id() {
        return this._id;
    },
    get name() {
        return this._name;
    },
    get owner() {
        return this._owner;
    },
    save: function (callback) {
        // remember the context since in callback it is changed
        var that = this;
        var doc = {
            name: this._name,
            owner: this._owner
        };

        Envelopes.insert(doc, function (error, result) {
            that._id = result;
            if (callback) {
                callback(error, result);
            }
        });
    }
};
