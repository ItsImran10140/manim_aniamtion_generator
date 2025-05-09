from manim import *

class CreateCircle(Scene):
    def construct(self):
        # Create a circle
        circle = Circle()
        circle.set_fill(PINK, opacity=0.5)
        
        # Create text
        text = Text("Hello from Node.js!", font_size=48)
        
        # Animate
        self.play(Create(circle))
        self.play(Transform(circle, text))
        self.wait(2)