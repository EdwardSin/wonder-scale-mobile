define({ "api": [
  {
    "type": "get",
    "url": "/items/discount/:username",
    "title": "Get All Discount Items By Username",
    "group": "Auth_Shop",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of shop.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "result",
            "description": "<p>All discount items.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ShopNotFound",
            "description": "<p>Shop is not found!</p>"
          }
        ]
      }
    },
    "name": "GetAllDiscountItemsByUsername",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-item.js",
    "groupTitle": "Auth_Shop"
  },
  {
    "type": "get",
    "url": "/items/discount/:username",
    "title": "Get All Discount Items By Username",
    "group": "Auth_Shop",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "category_id",
            "description": "<p>ID of category which adding item</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "ref_id",
            "description": "<p>ID in a shop.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of item.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "currency",
            "description": "<p>Currency of item.</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Price of item.</p>"
          },
          {
            "group": "Request body",
            "type": "Array",
            "optional": false,
            "field": "tags",
            "description": "<p>Tags of item.</p>"
          },
          {
            "group": "Request body",
            "type": "Boolean",
            "optional": false,
            "field": "share_item",
            "description": "<p>Return true if allowed to share item.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of item.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "profile_image_index",
            "description": "<p>Index of Profile URL of item.</p>"
          },
          {
            "group": "Request body",
            "type": "Array",
            "optional": false,
            "field": "description_images",
            "description": "<p>List of item description images.</p>"
          },
          {
            "group": "Request body",
            "type": "Boolean",
            "optional": false,
            "field": "show_offer",
            "description": "<p>Return true if show offer.</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "discount",
            "description": "<p>Discount of item.</p>"
          },
          {
            "group": "Request body",
            "type": "Array",
            "optional": false,
            "field": "item_images",
            "description": "<p>List of item profile images.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of item.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "category_id",
            "description": "<p>ID of category which adding item</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "ref_id",
            "description": "<p>ID in a shop.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of item.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "currency",
            "description": "<p>Currency of item.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Price of item.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "tags",
            "description": "<p>Tags of item.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "share_item",
            "description": "<p>Return true if allowed to share item.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of item.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "profile_image_index",
            "description": "<p>Index of Profile URL of item.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "show_offer",
            "description": "<p>Return true if show offer.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "item_images",
            "description": "<p>List of item profile images.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "description_images",
            "description": "<p>List of item description images.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of item.</p>"
          },
          {
            "group": "200",
            "type": "Date",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Updated date time.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ShopNotFound",
            "description": "<p>Shop is not found!</p>"
          }
        ]
      }
    },
    "name": "GetAllDiscountItemsByUsername",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-item.js",
    "groupTitle": "Auth_Shop"
  },
  {
    "type": "get",
    "url": "/items/discount/:username",
    "title": "Get All Discount Items By Username",
    "group": "Auth_Shop",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "category_id",
            "description": "<p>ID of category which adding item</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "ref_id",
            "description": "<p>ID in a shop.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of item.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "currency",
            "description": "<p>Currency of item.</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Price of item.</p>"
          },
          {
            "group": "Request body",
            "type": "Array",
            "optional": false,
            "field": "tags",
            "description": "<p>Tags of item.</p>"
          },
          {
            "group": "Request body",
            "type": "Boolean",
            "optional": false,
            "field": "share_item",
            "description": "<p>Return true if allowed to share item.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of item.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "profile_image_index",
            "description": "<p>Index of Profile URL of item.</p>"
          },
          {
            "group": "Request body",
            "type": "Array",
            "optional": false,
            "field": "description_images",
            "description": "<p>List of item description images.</p>"
          },
          {
            "group": "Request body",
            "type": "Boolean",
            "optional": false,
            "field": "show_offer",
            "description": "<p>Return true if show offer.</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "discount",
            "description": "<p>Discount of item.</p>"
          },
          {
            "group": "Request body",
            "type": "Array",
            "optional": false,
            "field": "item_images",
            "description": "<p>List of item profile images.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "category_id",
            "description": "<p>ID of category which adding item</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "ref_id",
            "description": "<p>ID in a shop.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of item.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "currency",
            "description": "<p>Currency of item.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Price of item.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "tags",
            "description": "<p>Tags of item.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "share_item",
            "description": "<p>Return true if allowed to share item.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of item.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "profile_image_inde",
            "description": "<p>Index of Profile URL of item.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "description_images",
            "description": "<p>List of item description images.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "show_offer",
            "description": "<p>Return true if show offer.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "item_images",
            "description": "<p>List of item profile images.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of item.</p>"
          },
          {
            "group": "200",
            "type": "Date",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Updated date time.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ShopNotFound",
            "description": "<p>Shop is not found!</p>"
          }
        ]
      }
    },
    "name": "GetAllDiscountItemsByUsername",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-item.js",
    "groupTitle": "Auth_Shop"
  },
  {
    "type": "get",
    "url": "/items/new/:username",
    "title": "Get All New Items By Username",
    "group": "Auth_Shop",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of shop.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "result",
            "description": "<p>All new items.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ShopNotFound",
            "description": "<p>Shop is not found!</p>"
          }
        ]
      }
    },
    "name": "GetAllNewItemsByUsername",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-item.js",
    "groupTitle": "Auth_Shop"
  },
  {
    "type": "get",
    "url": "/itemsbycategoryid/:id",
    "title": "Get Items By Category Id",
    "group": "Auth_Shop",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of category.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "result",
            "description": "<p>List of items.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ShopNotFound",
            "description": "<p>Shop is not found!</p>"
          }
        ]
      }
    },
    "name": "GetItemsByCategoryId",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-item.js",
    "groupTitle": "Auth_Shop"
  },
  {
    "type": "get",
    "url": "/items/all/:shop_id",
    "title": "Get All Items By Shopid",
    "group": "Auth_Shop",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "shop_id",
            "description": "<p>ID of shop.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "result",
            "description": "<p>All item list.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ShopNotFound",
            "description": "<p>Shop is not found!</p>"
          }
        ]
      }
    },
    "name": "getAllItemByShopId",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-item.js",
    "groupTitle": "Auth_Shop"
  },
  {
    "type": "get",
    "url": "/followitems",
    "title": "Get Follow Items",
    "group": "Auth_User",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "result",
            "description": "<p>List of items with seller.</p>"
          }
        ]
      }
    },
    "name": "GetFollowItems",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-user.js",
    "groupTitle": "Auth_User"
  },
  {
    "type": "get",
    "url": "/followitemsid",
    "title": "Get Follow Items ID",
    "group": "Auth_User",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "result",
            "description": "<p>List of following item id.</p>"
          }
        ]
      }
    },
    "name": "GetFollowItemsId",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-user.js",
    "groupTitle": "Auth_User"
  },
  {
    "type": "get",
    "url": "/followshops",
    "title": "Get Follow Shops",
    "group": "Auth_User",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "result",
            "description": "<p>List of shops.</p>"
          }
        ]
      }
    },
    "name": "GetFollowShops",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-user.js",
    "groupTitle": "Auth_User"
  },
  {
    "type": "get",
    "url": "/followshopsid",
    "title": "Get Follow Shops ID",
    "group": "Auth_User",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "result",
            "description": "<p>List of following shop id.</p>"
          }
        ]
      }
    },
    "name": "GetFollowShopsId",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-user.js",
    "groupTitle": "Auth_User"
  },
  {
    "type": "get",
    "url": "/isfollowitem/:id",
    "title": "Get whether is following item",
    "group": "Auth_User",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "follow",
            "description": "<p>Return true if following, else false</p>"
          }
        ]
      }
    },
    "name": "GetIsFollowItem",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-user.js",
    "groupTitle": "Auth_User"
  },
  {
    "type": "get",
    "url": "/isfollowshop/:id",
    "title": "Get whether is following shop",
    "group": "Auth_User",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "follow",
            "description": "<p>Return true if following, else false</p>"
          }
        ]
      }
    },
    "name": "GetIsFollowShop",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-user.js",
    "groupTitle": "Auth_User"
  },
  {
    "type": "get",
    "url": "/islikeshop/:id",
    "title": "Get whether is item liked",
    "group": "Auth_User",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "like",
            "description": "<p>Return true if like, else false</p>"
          }
        ]
      }
    },
    "name": "GetIsLikeShop",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-user.js",
    "groupTitle": "Auth_User"
  },
  {
    "type": "get",
    "url": "/newsfeed",
    "title": "Get News Feed",
    "group": "Auth_User",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "result",
            "description": "<p>List of shop with new items.</p>"
          }
        ]
      }
    },
    "name": "GetNewsFeed",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-user.js",
    "groupTitle": "Auth_User"
  },
  {
    "type": "get",
    "url": "/profile",
    "title": "Get Profile",
    "group": "Auth_User",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>First name of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last name of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "date_of_birth",
            "description": "<p>Date of birth of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "tel",
            "description": "<p>Tel of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "profile_image",
            "description": "<p>Profile URL of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "receive_info",
            "description": "<p>Return true if receive information.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "remember_token",
            "description": "<p>Return true if remember to login.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "blacklist",
            "description": "<p>Blacklist of user.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "like",
            "description": "<p>Like shops of user.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "follow",
            "description": "<p>Return follow object of user.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "routes",
            "description": "<p>Routes of user.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User is not found!</p>"
          }
        ]
      }
    },
    "name": "GetProfile",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-user.js",
    "groupTitle": "Auth_User"
  },
  {
    "type": "put",
    "url": "/edit/profile",
    "title": "Put To Edit Profile Image.",
    "group": "Auth_User",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>First name of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last name of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "date_of_birth",
            "description": "<p>Date of birth of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "tel",
            "description": "<p>Tel of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "profile_image",
            "description": "<p>Profile URL of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "receive_info",
            "description": "<p>Return true if receive information.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "remember_token",
            "description": "<p>Return true if remember to login.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "blacklist",
            "description": "<p>Blacklist of user.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "like",
            "description": "<p>Like shops of user.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "follow",
            "description": "<p>Return follow object of user.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "routes",
            "description": "<p>Routes of user.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User is not found!</p>"
          }
        ]
      }
    },
    "name": "GetProfile",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-user.js",
    "groupTitle": "Auth_User"
  },
  {
    "type": "get",
    "url": "/profilewithblacklist",
    "title": "Get Profile With Blacklist",
    "group": "Auth_User",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>First name of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last name of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "date_of_birth",
            "description": "<p>Date of birth of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "tel",
            "description": "<p>Tel of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "profile_image",
            "description": "<p>Profile URL of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "receive_info",
            "description": "<p>Return true if receive information.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "remember_token",
            "description": "<p>Return true if remember to login.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "blacklist",
            "description": "<p>Blacklist of user.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "like",
            "description": "<p>Like shops of user.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "follow",
            "description": "<p>Return follow object of user.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "routes",
            "description": "<p>Routes of user.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User is not found!</p>"
          }
        ]
      }
    },
    "name": "GetProfileWithBlackList",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-user.js",
    "groupTitle": "Auth_User"
  },
  {
    "type": "get",
    "url": "/add/followitem",
    "title": "Put To Add Follow Item",
    "group": "Auth_User",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "item_id",
            "description": "<p>Id of item.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "follow",
            "description": "<p>Return true if set else false.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "follower",
            "description": "<p>Number of follower.</p>"
          }
        ]
      }
    },
    "name": "PutAddFollowItem",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-user.js",
    "groupTitle": "Auth_User"
  },
  {
    "type": "get",
    "url": "/add/followshop",
    "title": "Put To Add Follow Shop",
    "group": "Auth_User",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shop_id",
            "description": "<p>Id of shop.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "follow",
            "description": "<p>Return true if set else false.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "follower",
            "description": "<p>Number of follower.</p>"
          }
        ]
      }
    },
    "name": "PutAddFollowShop",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-user.js",
    "groupTitle": "Auth_User"
  },
  {
    "type": "get",
    "url": "/changepassword",
    "title": "Put To Change Password",
    "group": "Auth_User",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "old_password",
            "description": "<p>Old password.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password to set.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "confirm_password",
            "description": "<p>Confirm password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "description": "<p>Return true if email is sent.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User is not found!</p>"
          }
        ]
      }
    },
    "name": "PutChangePassword",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-user.js",
    "groupTitle": "Auth_User"
  },
  {
    "type": "put",
    "url": "/edit/birthday",
    "title": "Put To Edit Birthday.",
    "group": "Auth_User",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>First name of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last name of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "date_of_birth",
            "description": "<p>Date of birth of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "tel",
            "description": "<p>Tel of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "profile_image",
            "description": "<p>Profile URL of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "receive_info",
            "description": "<p>Return true if receive information.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "remember_token",
            "description": "<p>Return true if remember to login.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "blacklist",
            "description": "<p>Blacklist of user.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "like",
            "description": "<p>Like shops of user.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "follow",
            "description": "<p>Return follow object of user.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "routes",
            "description": "<p>Routes of user.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User is not found!</p>"
          }
        ]
      }
    },
    "name": "PutEditBirthday",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-user.js",
    "groupTitle": "Auth_User"
  },
  {
    "type": "put",
    "url": "/edit/gender",
    "title": "Put To Edit Gender.",
    "group": "Auth_User",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>First name of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last name of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "date_of_birth",
            "description": "<p>Date of birth of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "tel",
            "description": "<p>Tel of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "profile_image",
            "description": "<p>Profile URL of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "receive_info",
            "description": "<p>Return true if receive information.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "remember_token",
            "description": "<p>Return true if remember to login.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "blacklist",
            "description": "<p>Blacklist of user.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "like",
            "description": "<p>Like shops of user.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "follow",
            "description": "<p>Return follow object of user.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "routes",
            "description": "<p>Routes of user.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User is not found!</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "InputEmptyError",
            "description": "<p>Input empty is not allowed!</p>"
          },
          {
            "group": "422",
            "optional": false,
            "field": "InputTooLongError",
            "description": "<p>Input is too long!</p>"
          }
        ]
      }
    },
    "name": "PutEditGender",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-user.js",
    "groupTitle": "Auth_User"
  },
  {
    "type": "put",
    "url": "/edit/name",
    "title": "Put To Edit Name.",
    "group": "Auth_User",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>First name of user.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last name of user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>First name of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last name of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "date_of_birth",
            "description": "<p>Date of birth of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "tel",
            "description": "<p>Tel of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "profile_image",
            "description": "<p>Profile URL of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "receive_info",
            "description": "<p>Return true if receive information.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "remember_token",
            "description": "<p>Return true if remember to login.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "blacklist",
            "description": "<p>Blacklist of user.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "like",
            "description": "<p>Like shops of user.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "follow",
            "description": "<p>Return follow object of user.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "routes",
            "description": "<p>Routes of user.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User is not found!</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "InputEmptyError",
            "description": "<p>Input empty is not allowed!</p>"
          },
          {
            "group": "422",
            "optional": false,
            "field": "InputTooLongError",
            "description": "<p>Input is too long!</p>"
          }
        ]
      }
    },
    "name": "PutEditName",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-user.js",
    "groupTitle": "Auth_User"
  },
  {
    "type": "put",
    "url": "/edit/tel",
    "title": "Put To Edit Tel.",
    "group": "Auth_User",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "tel",
            "description": "<p>Tel of user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>First name of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last name of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "date_of_birth",
            "description": "<p>Date of birth of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "tel",
            "description": "<p>Tel of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "profile_image",
            "description": "<p>Profile URL of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "receive_info",
            "description": "<p>Return true if receive information.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "remember_token",
            "description": "<p>Return true if remember to login.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "blacklist",
            "description": "<p>Blacklist of user.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "like",
            "description": "<p>Like shops of user.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "follow",
            "description": "<p>Return follow object of user.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "routes",
            "description": "<p>Routes of user.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User is not found!</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "InputEmptyError",
            "description": "<p>Input empty is not allowed!</p>"
          },
          {
            "group": "422",
            "optional": false,
            "field": "InputTooLongError",
            "description": "<p>Input is too long!</p>"
          }
        ]
      }
    },
    "name": "PutEditTel",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-user.js",
    "groupTitle": "Auth_User"
  },
  {
    "type": "get",
    "url": "/like/shop",
    "title": "Put To Like Shop",
    "group": "Auth_User",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shop_id",
            "description": "<p>Id of shop.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "like",
            "description": "<p>Return true if set else false.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "num_like",
            "description": "<p>Number of like.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User is not found!</p>"
          }
        ]
      }
    },
    "name": "PutLikeShop",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-user.js",
    "groupTitle": "Auth_User"
  },
  {
    "type": "get",
    "url": "/remove/followitem",
    "title": "Put To Remove Follow Item",
    "group": "Auth_User",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shop_id",
            "description": "<p>Id of shop.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "follow",
            "description": "<p>Return false is remove, else true.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "follower",
            "description": "<p>Number of follower.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User is not found!</p>"
          }
        ]
      }
    },
    "name": "PutRemoveFollowShop",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-user.js",
    "groupTitle": "Auth_User"
  },
  {
    "type": "get",
    "url": "/remove/followshop",
    "title": "Put To Remove Follow Shop",
    "group": "Auth_User",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shop_id",
            "description": "<p>Id of shop.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "follow",
            "description": "<p>Return false is remove, else true.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "follower",
            "description": "<p>Number of follower.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User is not found!</p>"
          }
        ]
      }
    },
    "name": "PutRemoveFollowShop",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-user.js",
    "groupTitle": "Auth_User"
  },
  {
    "type": "get",
    "url": "/unlike/shop",
    "title": "Put To Unlike Shop",
    "group": "Auth_User",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shop_id",
            "description": "<p>Id of shop.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "like",
            "description": "<p>Return false if set else true.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "num_like",
            "description": "<p>Number of like.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User is not found!</p>"
          }
        ]
      }
    },
    "name": "PutUnlikeShop",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-user.js",
    "groupTitle": "Auth_User"
  },
  {
    "type": "put",
    "url": "/edit/profile",
    "title": "Put To Edit User Info.",
    "group": "Auth_User",
    "permission": [
      {
        "name": "Authentication"
      }
    ],
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>First name of user.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last name of user.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "tel",
            "description": "<p>Tel of user.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "date_of_birth",
            "description": "<p>Date of birth of user.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of user.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "profile_image",
            "description": "<p>Profile URL of user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>First name of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last name of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "date_of_birth",
            "description": "<p>Date of birth of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "tel",
            "description": "<p>Tel of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "profile_image",
            "description": "<p>Profile URL of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "receive_info",
            "description": "<p>Return true if receive information.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "remember_token",
            "description": "<p>Return true if remember to login.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "blacklist",
            "description": "<p>Blacklist of user.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "like",
            "description": "<p>Like shops of user.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "follow",
            "description": "<p>Return follow object of user.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "routes",
            "description": "<p>Routes of user.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User is not found!</p>"
          }
        ]
      }
    },
    "name": "PutUserInfo",
    "version": "0.0.0",
    "filename": "server/route/auth/auth-user.js",
    "groupTitle": "Auth_User"
  },
  {
    "type": "get",
    "url": "/:shop_id",
    "title": "Shop ID.",
    "name": "GetPublicCategoriesByShopId",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "shop_id",
            "description": "<p>Shop Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "result",
            "description": "<p>Result of public category list.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ShopNotFound",
            "description": "<p>Shop is not found!</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/route/public/category.js",
    "groupTitle": "Category"
  },
  {
    "type": "get",
    "url": "/:id",
    "title": "Get Item by id",
    "name": "GetItem",
    "group": "Item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Item Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "ref_id",
            "description": "<p>Reference id of item.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of item.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "currency",
            "description": "<p>Currency of item.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "shop_id",
            "description": "<p>Linked shop id.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "category_id",
            "description": "<p>List of linked category id.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "is_new",
            "description": "<p>Return true if item is new.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>Price of item.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "discount",
            "description": "<p>Discount of item.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "show_offer",
            "description": "<p>Return true if show offer.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "share_item",
            "description": "<p>Return true if item is shared.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of item.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "profile_image_index",
            "description": "<p>Index of profile image of item.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "item_images",
            "description": "<p>Profile images of item.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "description_images",
            "description": "<p>Description images of item.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "tags",
            "description": "<p>Tags of item.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "like",
            "description": "<p>Like of item.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "view",
            "description": "<p>View of item.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "follower",
            "description": "<p>Follower of item.</p>"
          },
          {
            "group": "200",
            "type": "Date",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Updated date of item.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of item.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ItemNotFound",
            "description": "<p>Item is not found!</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/route/public/item.js",
    "groupTitle": "Item"
  },
  {
    "type": "get",
    "url": "/itemwithseller/:id",
    "title": "Get item with seller by id",
    "name": "GetItemWithSellerById",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Item Id</p>"
          }
        ]
      }
    },
    "group": "Item",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "ref_id",
            "description": "<p>Reference id of item.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of item.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "currency",
            "description": "<p>Currency of item.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "shop_id",
            "description": "<p>Linked shop id.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "category_id",
            "description": "<p>List of linked category id.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "is_new",
            "description": "<p>Return true if item is new.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>Price of item.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "discount",
            "description": "<p>Discount of item.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "show_offer",
            "description": "<p>Return true if show offer.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "share_item",
            "description": "<p>Return true if item is shared.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of item.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "profile_image_index",
            "description": "<p>Index of profile image of item.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "item_images",
            "description": "<p>Profile images of item.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "description_images",
            "description": "<p>Description images of item.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "tags",
            "description": "<p>Tags of item.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "like",
            "description": "<p>Like of item.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "view",
            "description": "<p>View of item.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "follower",
            "description": "<p>Follower of item.</p>"
          },
          {
            "group": "200",
            "type": "Date",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Updated date of item.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of item.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ItemNotFound",
            "description": "<p>Item is not found!</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/route/public/item.js",
    "groupTitle": "Item"
  },
  {
    "type": "get",
    "url": "/public/items/:id",
    "title": "Get Public All Items",
    "name": "GetPublicAllItem",
    "group": "Item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Shop Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "result",
            "description": "<p>Result of all items in a shop.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/route/public/item.js",
    "groupTitle": "Item"
  },
  {
    "type": "get",
    "url": "/public/items/:id",
    "title": "Get Public All Items",
    "name": "GetPublicDiscountItem",
    "group": "Item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Shop Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "result",
            "description": "<p>Result of discount items in a shop.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/route/public/item.js",
    "groupTitle": "Item"
  },
  {
    "type": "get",
    "url": "/public/items/:id",
    "title": "Get Public Item By Category Id",
    "name": "GetPublicItemByCategoryId",
    "group": "Item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Category Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "result",
            "description": "<p>Result of category items.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/route/public/item.js",
    "groupTitle": "Item"
  },
  {
    "type": "get",
    "url": "/public/items/:id",
    "title": "Get Public New Items",
    "name": "GetPublicNewItem",
    "group": "Item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Shop Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "result",
            "description": "<p>Result of new items in a shop.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/route/public/item.js",
    "groupTitle": "Item"
  },
  {
    "type": "get",
    "url": "/similar/:name",
    "title": "Get similar items",
    "name": "GetSimilarItems",
    "group": "Item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "name",
            "description": "<p>Similar text</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "result",
            "description": "<p>Result of similar items.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/route/public/item.js",
    "groupTitle": "Item"
  },
  {
    "type": "get",
    "url": "/:id",
    "title": "Get review by id",
    "group": "Review",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of review(Get from shop).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "result",
            "description": "<p>List of reviews.</p>"
          }
        ]
      }
    },
    "name": "GetReivewById",
    "version": "0.0.0",
    "filename": "server/route/public/review.js",
    "groupTitle": "Review"
  },
  {
    "type": "put",
    "url": "/add",
    "title": "Put add review",
    "group": "Review",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "review_id",
            "description": "<p>Review Id from shop.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "user_email",
            "description": "<p>Email of user.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "profile_image",
            "description": "<p>Profile URL of user.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>First name of user.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last name of user.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Content of review.</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "rating",
            "description": "<p>Rating of review.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "user_email",
            "description": "<p>Email of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "profile_image",
            "description": "<p>Profile URL of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>First name of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last name of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "review_id",
            "description": "<p>Review id link with shop.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "reviews",
            "description": "<p>List of content of reviews.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "ReviewPostedError",
            "description": "<p>Review has been posted before!</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "UserNotAuthenticated",
            "description": "<p>User is not authenticated!</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ShopNotFound",
            "description": "<p>Shop is not found!</p>"
          },
          {
            "group": "404",
            "optional": false,
            "field": "ReviewNotFound",
            "description": "<p>Review is not found!</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "RatingNotFilled",
            "description": "<p>Rating is not filled!</p>"
          }
        ]
      }
    },
    "name": "PutAddReview",
    "version": "0.0.0",
    "filename": "server/route/public/review.js",
    "groupTitle": "Review"
  },
  {
    "type": "put",
    "url": "/reply/edit/:review_id",
    "title": "Put edit reply",
    "group": "Review",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "review_id",
            "description": "<p>Id of review.</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Content of review.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "result",
            "description": "<p>Return review.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Content of updated reply.</p>"
          },
          {
            "group": "200",
            "type": "Date",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Updated date time of reply.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ReviewNotFound",
            "description": "<p>Review is not found!</p>"
          }
        ]
      }
    },
    "name": "PutEditReply",
    "version": "0.0.0",
    "filename": "server/route/public/review.js",
    "groupTitle": "Review"
  },
  {
    "type": "put",
    "url": "/edit/:review_id",
    "title": "Put edit review",
    "group": "Review",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "review_id",
            "description": "<p>Id of review.</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Content of review.</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "rating",
            "description": "<p>Rating of review.</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "differencerating",
            "description": "<p>Difference point of rating.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Content of updated reply.</p>"
          },
          {
            "group": "200",
            "type": "Date",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Updated date time of reply.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ReviewNotFound",
            "description": "<p>Review is not found!</p>"
          },
          {
            "group": "404",
            "optional": false,
            "field": "ShopNotFound",
            "description": "<p>Shop is not found!</p>"
          }
        ]
      }
    },
    "name": "PutEditReview",
    "version": "0.0.0",
    "filename": "server/route/public/review.js",
    "groupTitle": "Review"
  },
  {
    "type": "put",
    "url": "/reply/remove/:review_id",
    "title": "Put remove reply",
    "group": "Review",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "review_id",
            "description": "<p>Id of review.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "description": "<p>Return true.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ReviewNotFound",
            "description": "<p>Review is not found!</p>"
          }
        ]
      }
    },
    "name": "PutRemoveReply",
    "version": "0.0.0",
    "filename": "server/route/public/review.js",
    "groupTitle": "Review"
  },
  {
    "type": "put",
    "url": "/remove/:review_id",
    "title": "Put remove review",
    "group": "Review",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "review_id",
            "description": "<p>Id of review.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "description": "<p>Return true.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "ReivewWithReplyError",
            "description": "<p>Review cannot be removed without any reply!</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ReviewNotFound",
            "description": "<p>Review is not found!</p>"
          }
        ]
      }
    },
    "name": "PutRemoveReview",
    "version": "0.0.0",
    "filename": "server/route/public/review.js",
    "groupTitle": "Review"
  },
  {
    "type": "put",
    "url": "/reply/:review_id",
    "title": "Put reply review",
    "group": "Review",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "review_id",
            "description": "<p>Id of review.</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Content of review.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "result",
            "description": "<p>Return review.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Content of updated reply.</p>"
          },
          {
            "group": "200",
            "type": "Date",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Updated date time of reply.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ReviewNotFound",
            "description": "<p>Review is not found!</p>"
          }
        ]
      }
    },
    "name": "PutReplyReview",
    "version": "0.0.0",
    "filename": "server/route/public/review.js",
    "groupTitle": "Review"
  },
  {
    "type": "get",
    "url": "/getcurrency",
    "title": "Get Currency",
    "description": "<p>Get Currency And Rating</p>",
    "group": "Shop",
    "name": "GetCurrency",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>The request is success.</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>Currency is returned.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"_id\": \"C1\",\n         \"base\": \"EUR\",\n         \"updated_at\": \"2018-11-17T00:00:00.000Z\",\n         \"rates\": [{'AED': 4.194999 }]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/route/public/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "get",
    "url": "/nearshop/:lng/lat/:maxdistance",
    "title": "Get Near shops",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lng",
            "description": "<p>Longitude of shop.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lat",
            "description": "<p>Latitude of shop.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "maxdistance",
            "description": "<p>Maximum distance of shop.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "result",
            "description": "<p>List of shop near to the point.</p>"
          }
        ]
      }
    },
    "group": "Shop",
    "version": "0.0.0",
    "filename": "server/route/public/shop.js",
    "groupTitle": "Shop",
    "name": "GetNearshopLngLatMaxdistance"
  },
  {
    "type": "get",
    "url": "/name/:name",
    "title": "Get Shops by name",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Keyword to find similar shop name.</p>"
          }
        ]
      }
    },
    "group": "Shop",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "result",
            "description": "<p>List of shop of similar name.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ShopNotFound",
            "description": "<p>Shop is not found!</p>"
          }
        ]
      }
    },
    "name": "GetShopByName",
    "version": "0.0.0",
    "filename": "server/route/public/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "get",
    "url": "/username/:username",
    "title": "Get Shop Information by username",
    "name": "GetShopByUsername",
    "description": "<p>Get Shop Information By Username</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of shop.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of shop.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of shop.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Updated date.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "profile_image",
            "description": "<p>Profile URL of shop.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of shop.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "email",
            "description": "<p>Emails of shop.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "phone",
            "description": "<p>Phones of shop.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "website",
            "description": "<p>Websites of shop.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "full_address",
            "description": "<p>Full address of shop.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "location",
            "description": "<p>Location of shop.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "tags",
            "description": "<p>Tags of shop.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of shop.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "opening_info",
            "description": "<p>Opening Information of shop.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "opening_info_type",
            "description": "<p>Opening Information Type of shop.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "current_status",
            "description": "<p>Return true if shop is open.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "review_id",
            "description": "<p>Review id of shop.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "like",
            "description": "<p>Number of like of shop.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "media",
            "description": "<p>Media of shop.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "information_images",
            "description": "<p>Information Images of shop.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "new",
            "description": "<p>New item inforamtion of shop.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "category_list",
            "description": "<p>Category List of shop.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "advertise",
            "description": "<p>Advertising information of shop.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ShopNotFound",
            "description": "<p>Shop is not found!</p>"
          }
        ]
      }
    },
    "group": "Shop",
    "version": "0.0.0",
    "filename": "server/route/public/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "get",
    "url": "/shopwithnewitems/:id",
    "title": "Get Shop with public new items by shop id",
    "group": "Shop",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of shop</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of shop.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of shop.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Updated date.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "profile_image",
            "description": "<p>Profile URL of shop.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of shop.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "email",
            "description": "<p>Emails of shop.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "phone",
            "description": "<p>Phones of shop.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "website",
            "description": "<p>Websites of shop.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "full_address",
            "description": "<p>Full address of shop.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "location",
            "description": "<p>Location of shop.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "tags",
            "description": "<p>Tags of shop.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of shop.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "opening_info",
            "description": "<p>Opening Information of shop.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "opening_info_type",
            "description": "<p>Opening Information Type of shop.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "current_status",
            "description": "<p>Return true if shop is open.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "review_id",
            "description": "<p>Review id of shop.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "like",
            "description": "<p>Number of like of shop.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "media",
            "description": "<p>Media of shop.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "information_images",
            "description": "<p>Information Images of shop.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "new",
            "description": "<p>New item inforamtion of shop.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "category_list",
            "description": "<p>Category List of shop.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "advertise",
            "description": "<p>Advertising information of shop.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "newItems",
            "description": "<p>New item list of shop.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ShopNotFound",
            "description": "<p>Shop is not found!</p>"
          }
        ]
      }
    },
    "name": "GetShopWithNewItems",
    "version": "0.0.0",
    "filename": "server/route/public/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "get",
    "url": "/shopwithitems/:id",
    "title": "Get Shop with public items by id",
    "group": "Shop",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of shop</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of shop.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of shop.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Updated date.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "profile_image",
            "description": "<p>Profile URL of shop.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of shop.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "email",
            "description": "<p>Emails of shop.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "phone",
            "description": "<p>Phones of shop.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "website",
            "description": "<p>Websites of shop.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "full_address",
            "description": "<p>Full address of shop.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "location",
            "description": "<p>Location of shop.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "tags",
            "description": "<p>Tags of shop.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of shop.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "opening_info",
            "description": "<p>Opening Information of shop.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "opening_info_type",
            "description": "<p>Opening Information Type of shop.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "current_status",
            "description": "<p>Return true if shop is open.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "review_id",
            "description": "<p>Review id of shop.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "like",
            "description": "<p>Number of like of shop.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "media",
            "description": "<p>Media of shop.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "information_images",
            "description": "<p>Information Images of shop.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "new",
            "description": "<p>New item inforamtion of shop.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "category_list",
            "description": "<p>Category List of shop.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "advertise",
            "description": "<p>Advertising information of shop.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ShopNotFound",
            "description": "<p>Shop is not found!</p>"
          }
        ]
      }
    },
    "name": "GetShopWithPublicItems",
    "version": "0.0.0",
    "filename": "server/route/public/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "get",
    "url": "/top10nearestshops/:lng/:lat/:maxdistance",
    "title": "Get First 10 Nearest Shops",
    "group": "Shop",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "result",
            "description": "<p>10 nearest shops</p>"
          }
        ]
      }
    },
    "name": "GetTop10NearestShops",
    "version": "0.0.0",
    "filename": "server/route/public/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "get",
    "url": "/top10registeredrestaurants",
    "title": "Get First 10 Registered Restaurants",
    "group": "Shop",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "result",
            "description": "<p>10 registered restaurants</p>"
          }
        ]
      }
    },
    "name": "GetTop10RegisteredRestaurants",
    "version": "0.0.0",
    "filename": "server/route/public/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "get",
    "url": "/top10registeredserviceshops",
    "title": "Get First 10 Registered Service Shop",
    "group": "Shop",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "result",
            "description": "<p>10 registered service shops</p>"
          }
        ]
      }
    },
    "name": "GetTop10RegisteredServiceShops",
    "version": "0.0.0",
    "filename": "server/route/public/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "get",
    "url": "/top10registeredshoppingshops",
    "title": "Get First 10 Registered Shopping Shops",
    "group": "Shop",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "result",
            "description": "<p>10 registered shopping shops</p>"
          }
        ]
      }
    },
    "name": "GetTop10RegisteredShopping",
    "version": "0.0.0",
    "filename": "server/route/public/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "put",
    "url": "/reject/:id",
    "title": "Reject shop to join",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of shop.</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "verification_code",
            "description": "<p>Verification Code.</p>"
          }
        ]
      }
    },
    "group": "Shop",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of shop.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of shop.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Updated date.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "profile_image",
            "description": "<p>Profile URL of shop.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of shop.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "email",
            "description": "<p>Emails of shop.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "phone",
            "description": "<p>Phones of shop.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "website",
            "description": "<p>Websites of shop.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "full_address",
            "description": "<p>Full address of shop.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "location",
            "description": "<p>Location of shop.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "tags",
            "description": "<p>Tags of shop.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of shop.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "opening_info",
            "description": "<p>Opening Information of shop.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "opening_info_type",
            "description": "<p>Opening Information Type of shop.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "current_status",
            "description": "<p>Return true if shop is open.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "review_id",
            "description": "<p>Review id of shop.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "like",
            "description": "<p>Number of like of shop.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "media",
            "description": "<p>Media of shop.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "information_images",
            "description": "<p>Information Images of shop.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "new",
            "description": "<p>New item inforamtion of shop.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "category_list",
            "description": "<p>Category List of shop.</p>"
          },
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "advertise",
            "description": "<p>Advertising information of shop.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User is not found!</p>"
          }
        ]
      }
    },
    "name": "PutRejectShop",
    "version": "0.0.0",
    "filename": "server/route/public/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "get",
    "url": "/checkemail/:email",
    "title": "Get To Check Email whether is unique",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user.</p>"
          }
        ]
      }
    },
    "group": "User",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "description": "<p>Returns true if email is valid, false if email is registered.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     result: true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UserRegistered",
            "description": "<p>Email is already registered!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 User Registered\n{\n     \"error\": \"Email is already registered!\"\n}",
          "type": "json"
        }
      ]
    },
    "name": "GetCheckEmail",
    "version": "0.0.0",
    "filename": "server/route/public/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/resetpassword/:token",
    "title": "Get whether token is valid to reset password",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Reset token assigned by server.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     email: 'edwardcullen@hotmail.com'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "PasswordExpired",
            "description": "<p>Password link is expired!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Password Link Expired\n{\n     \"error\": \"Password link is expired!\"\n}",
          "type": "json"
        }
      ]
    },
    "name": "GetResetPassword",
    "version": "0.0.0",
    "filename": "server/route/public/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/profile/:email",
    "title": "Get User Profile By email",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user.</p>"
          }
        ]
      }
    },
    "group": "User",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>Firstname of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Lastname of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "profile_image",
            "description": "<p>Profile URL of user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     first_name: 'Edward',\n     last_name: 'Cullen',\n     email: 'edwardcullen@hotmail.com',\n     profile_image: 'https://res.cloudinary.com/hdpveefqg/image/upload/v1534689251/profile.png'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The email of the user is not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n     \"error\": \"User is not found!\"\n}",
          "type": "json"
        }
      ]
    },
    "name": "GetUserProfileByEmail",
    "version": "0.0.0",
    "filename": "server/route/public/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/profileid/:id",
    "title": "Get User Profile By id",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the user.</p>"
          }
        ]
      }
    },
    "group": "User",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>Firstname of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Lastname of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "profile_image",
            "description": "<p>Profile URL of user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     first_name: 'Edward',\n     last_name: 'Cullen',\n     email: 'edwardcullen@hotmail.com',\n     profile_image: 'https://res.cloudinary.com/hdpveefqg/image/upload/v1534689251/profile.png'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The email of the user is not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n     \"error\": \"User is not found!\"\n}",
          "type": "json"
        }
      ]
    },
    "name": "GetUserProfileById",
    "version": "0.0.0",
    "filename": "server/route/public/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Post To Login by username & password",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Login email</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Login Password</p>"
          }
        ]
      }
    },
    "group": "User",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "description": "<p>Return true if logged in.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Authentication token for keep login.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     result: true,\n     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiV29vbiBLaGFuZyIsImVtYWlsIjoiZWR3YXJkc2luOTlAaG90bWFpbC5jb20iLCJpYXQiOjE1NDI4NjE4MDF9._tydf5na7LJ_wAMPb9egjruCkFNnKSpgH7Khxf14xtk'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User is not found!</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "SocialMediaTypeError",
            "description": "<p>User supposed to use social media to login.</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "PasswordMatchError",
            "description": "<p>Passwords are not matched!</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UserActivateError",
            "description": "<p>User should be activated!</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "EmailRequiredError",
            "description": "<p>Email is required!</p>"
          },
          {
            "group": "422",
            "optional": false,
            "field": "PasswordRequiredError",
            "description": "<p>Password is required!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 User not found\n{\n     \"error\": \"Please enter a valid email!\"\n}",
          "type": "json"
        }
      ]
    },
    "name": "PostLogin",
    "version": "0.0.0",
    "filename": "server/route/public/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/addbyfb",
    "title": "Post To Login by FB",
    "group": "User",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>First name of the user.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last name of the user.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "profile_image",
            "description": "<p>Profile URL of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "description": "<p>Return true if logged in.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Authentication token for keep login.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     result: true,\n     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiV29vbiBLaGFuZyIsImVtYWlsIjoiZWR3YXJkc2luOTlAaG90bWFpbC5jb20iLCJpYXQiOjE1NDI4NjE4MDF9._tydf5na7LJ_wAMPb9egjruCkFNnKSpgH7Khxf14xtk'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "EmailConflictError",
            "description": "<p>Use email to login instead of using facebook!</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "EmailInvalidError",
            "description": "<p>Email is not valid!</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "EmailRequiredError",
            "description": "<p>Email is required!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 EmailRequiredError\n{\n     \"error\": \"Email is required!\"\n}",
          "type": "json"
        }
      ]
    },
    "name": "PostLoginByFB",
    "version": "0.0.0",
    "filename": "server/route/public/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/addbygoogle",
    "title": "Post To Login by Google",
    "group": "User",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>First name of the user.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last name of the user.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "profile_image",
            "description": "<p>Profile URL of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "description": "<p>Return true if logged in.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Authentication token for keep login.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     result: true,\n     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiV29vbiBLaGFuZyIsImVtYWlsIjoiZWR3YXJkc2luOTlAaG90bWFpbC5jb20iLCJpYXQiOjE1NDI4NjE4MDF9._tydf5na7LJ_wAMPb9egjruCkFNnKSpgH7Khxf14xtk'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "EmailConflictError",
            "description": "<p>Use email to login instead of using Google!</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "EmailInvalidError",
            "description": "<p>Email is not valid!</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "EmailRequiredError",
            "description": "<p>Email is required!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 EmailRequiredError\n{\n     \"error\": \"Email is required!\"\n}",
          "type": "json"
        }
      ]
    },
    "name": "PostLoginByGoogle",
    "version": "0.0.0",
    "filename": "server/route/public/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/add",
    "title": "Post To Register user",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>Firstname of user.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Lastname of user.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of user.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "confirm_password",
            "description": "<p>Confirm passowrd of user.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "tel",
            "description": "<p>Tel of user.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of user.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "date_of_birth",
            "description": "<p>Date of Birth of user.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "receive_info",
            "description": "<p>Receive Info of user.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "remember_token",
            "description": "<p>Remember Token of user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "description": "<p>Response is successful.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     result: true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "EmailRequiredError",
            "description": "<p>Email is required!</p>"
          },
          {
            "group": "422",
            "optional": false,
            "field": "FirstNameRequiredError",
            "description": "<p>First name is required!</p>"
          },
          {
            "group": "422",
            "optional": false,
            "field": "LastNameRequiredError",
            "description": "<p>Last name is required!</p>"
          },
          {
            "group": "422",
            "optional": false,
            "field": "TelRequiredError",
            "description": "<p>Tel is required!</p>"
          },
          {
            "group": "422",
            "optional": false,
            "field": "GenderRequiredError",
            "description": "<p>Gender is required!</p>"
          },
          {
            "group": "422",
            "optional": false,
            "field": "PasswordRequiredError",
            "description": "<p>Password is required!</p>"
          },
          {
            "group": "422",
            "optional": false,
            "field": "PasswordFormatError",
            "description": "<p>Password format is invalid!</p>"
          },
          {
            "group": "422",
            "optional": false,
            "field": "ConfirmPasswordRequiredError",
            "description": "<p>Confirm password is required!</p>"
          },
          {
            "group": "422",
            "optional": false,
            "field": "ConfirmPasswordFormatError",
            "description": "<p>Confirm password format is invalid!</p>"
          },
          {
            "group": "422",
            "optional": false,
            "field": "DateofBirthRequiredError",
            "description": "<p>Date of birth is required!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Error messages\n{\n     \"error\": {\n         \"message\" : \"Please enter email!\",\n         \"type\": \"email\"\n      }\n}",
          "type": "json"
        }
      ]
    },
    "group": "User",
    "name": "PostRegisterUser",
    "version": "0.0.0",
    "filename": "server/route/public/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/resendactivationemail",
    "title": "Post To Resend Activation Email",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "description": "<p>Response is successful.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     result: true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "AccountActivatedError",
            "description": "<p>Account is already activated!</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "UserNotAuthenticated",
            "description": "<p>User is not authenticated!</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User is not found!</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "PasswordNotProvided",
            "description": "<p>Password is not provided!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 UserNotFound\n{\n     \"error\": \"User is not found!\"\n}",
          "type": "json"
        }
      ]
    },
    "group": "User",
    "name": "PostResendActivationEmail",
    "version": "0.0.0",
    "filename": "server/route/public/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/resetpassword",
    "title": "Post To Send Reset Password Link",
    "group": "User",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Forgot Password Email</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "description": "<p>Response is successful.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     result: true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "AccountActivateError",
            "description": "<p>Account is not activated.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User is not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 UserNotFound\n{\n     \"error\": \"User is not found!\"\n}",
          "type": "json"
        }
      ]
    },
    "name": "PostResetPassword",
    "version": "0.0.0",
    "filename": "server/route/public/user.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/activate/:token",
    "title": "Put To Activate Email by Token",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Sending Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "description": "<p>Response is successful.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     result: true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "ActivatedLinkExpired",
            "description": "<p>Activated link is expired!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 ActivatedLinkExpired\n{\n     \"error\": \"Activated link is expired!\"\n}",
          "type": "json"
        }
      ]
    },
    "group": "User",
    "name": "PutActivateEmail",
    "version": "0.0.0",
    "filename": "server/route/public/user.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/resendactivationemail",
    "title": "Put To Send Activation Email",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "description": "<p>Response is successful.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     result: true\n}",
          "type": "json"
        }
      ]
    },
    "group": "User",
    "name": "PutResendActivationEmail",
    "version": "0.0.0",
    "filename": "server/route/public/user.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/savepassword",
    "title": "Put To Edit Password",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email to change password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "new_password",
            "description": "<p>New password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "confirm_password",
            "description": "<p>Confirmation Password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "description": "<p>Response is successful.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     result: true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User is not found!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 UserNotFound\n{\n     \"error\": \"User is not found!\"\n}",
          "type": "json"
        }
      ]
    },
    "group": "User",
    "name": "PutSavePassword",
    "version": "0.0.0",
    "filename": "server/route/public/user.js",
    "groupTitle": "User"
  }
] });
