class Paddle:
    def __init__(self, x, y, height, width):
        self.x = x
        self.y = y
        self.height = height
        self.width = width

    def move(self, dy, canvas_height):
        self.y = max(min(self.y + dy, canvas_height // 2 - self.height // 2), -canvas_height // 2 + self.height // 2)

    def to_dict(self):
        return {"x": self.x, "y": self.y, "width": self.width, "height": self.height}
