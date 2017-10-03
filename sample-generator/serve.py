import tornado.ioloop
import tornado.web
import tornado.template

THEME_TYPE = "theme_type"
CONTENT_TYPE = "content_type"
CONTENT_HEADER = "content_header"
CONTENT_BODY = "content_body"
CONTENT_FOOTER = "content_footer"

defaults = {
    THEME_TYPE : "boostrap",
    CONTENT_TYPE : "popup",
    CONTENT_HEADER : "Alert",
    CONTENT_BODY : "Would you like to take this reward?",
    CONTENT_FOOTER : "[\"No\", \"Yes\"]"
}

class WebHandler(tornado.web.RequestHandler):
    def get(self):
        theme_type = self.get_argument(THEME_TYPE, defaults[THEME_TYPE])
        content_type = self.get_argument(CONTENT_TYPE, defaults[CONTENT_TYPE])
        content_header = self.get_argument(CONTENT_HEADER, defaults[CONTENT_HEADER])
        content_body = self.get_argument(CONTENT_BODY, defaults[CONTENT_BODY])
        content_footer = self.get_argument(CONTENT_FOOTER, defaults[CONTENT_FOOTER])
        self.render("bootstrap-themes/bell/index.html")

def make_app():
    return tornado.web.Application([
        (r"/bootstrap-themes/bell/", WebHandler)
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()