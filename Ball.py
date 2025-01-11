import random

class Ball:
    def __init__(self, x, y, dx=5, dy=5, radius=10):
        self.initial_x = x
        self.initial_y = y 
        self.x = x
        self.y = y
        self.dx = dx
        self.dy = dy
        self.radius = radius

    def move(self):
        self.x += self.dx
        self.y += self.dy

    def check_collision(self, paddle1Y, paddle2Y, canvas_width, canvas_height, paddle_width, paddle_height):
        if self.y + self.radius > canvas_height / 2 or self.y - self.radius < -canvas_height / 2:
            self.dy = -self.dy

        if self.x - self.radius < -canvas_width / 2 + paddle_width and \
           paddle1Y - paddle_height / 2 < self.y < paddle1Y + paddle_height / 2:
            self.dx = -self.dx

        if self.x + self.radius > canvas_width / 2 - paddle_width and \
           paddle2Y - paddle_height / 2 < self.y < paddle2Y + paddle_height / 2:
            self.dx = -self.dx

    def reset(self):
        self.x = self.initial_x
        self.y = self.initial_y
        self.dx = random.choice([-5, 5])
        self.dy = random.choice([-5, 5])
