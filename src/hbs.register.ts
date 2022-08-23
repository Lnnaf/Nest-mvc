import * as moment from 'moment';
import { PostStatus } from './enums/post.status.enum';
import { ResponseStatus } from './enums/response.status.enum';
import { Role } from './enums/role.enum';

var register = function (Handlebars) {
    var helpers = {
        formatDate: function (dateString) {
            return new Handlebars.SafeString(
                moment(dateString).format("DD-MM-YYYY")
            );
        },
        published: function (value) {
            return value == PostStatus.PUBLISHED;
        },
        rejected: function (value) {
            return value == PostStatus.REJECTED;
        },
        pending: function (value) {
            return value == PostStatus.WAITING_APPROVE;
        },
        draft: function (value) {
            return value == PostStatus.DRAFT;
        }, 
        isAdmin: function (value) {
            return value == Role.ADMIN;
        },isPostSuccess:function (value) {
            return value == ResponseStatus.S;
        }
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        return helpers;
    }

};

module.exports.register = register;