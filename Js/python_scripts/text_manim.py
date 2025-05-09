from manim import *

class ShapesInScreen(Scene):
    def construct(self):
        # Define shapes
        circle = Circle(color=BLUE, fill_opacity=0.5)
        square = Square(color=GREEN, fill_opacity=0.5)
        triangle = Triangle(color=RED, fill_opacity=0.5)

        # Position shapes
        circle.move_to(LEFT * 3)
        square.move_to(UP * 2)
        triangle.move_to(RIGHT * 3 + DOWN * 1)

        # Add shapes to the scene
        self.play(Create(circle), Create(square), Create(triangle))
        self.wait(2)

        # Create labels for the shapes
        circle_label = Tex("Circle").next_to(circle, DOWN)
        square_label = Tex("Square").next_to(square, DOWN)
        triangle_label = Tex("Triangle").next_to(triangle, DOWN)

        # Display the labels
        self.play(Write(circle_label), Write(square_label), Write(triangle_label))
        self.wait(2)

        # Group the shapes and labels
        group = VGroup(circle, square, triangle, circle_label, square_label, triangle_label)

        # Scale the group down and move it to the center
        self.play(
            group.animate.scale(0.7).move_to(ORIGIN)
        )
        self.wait(2)

        # Fade out everything
        self.play(FadeOut(group))
        self.wait(1)
