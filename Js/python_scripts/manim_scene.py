from manim import *

class CreateCircle(Scene):
    def construct(self):
        # Create a Circle object
        circle = Circle(radius=2, color=BLUE)

        # Display the circle on the screen
        self.play(Create(circle))

        # Wait for a brief moment
        self.wait(1)

        # Add a label to the circle
        label = Tex("Circle", color=YELLOW).next_to(circle, DOWN)
        self.play(Write(label))

        # Wait for a longer moment to allow viewing
        self.wait(2)

        # Create a filled version of the circle
        filled_circle = Circle(radius=2, color=BLUE, fill_opacity=0.5)
        filled_circle.move_to(circle.get_center()) # Ensures it's in the same location

        # Replace the original circle with the filled one
        self.play(Transform(circle, filled_circle), FadeOut(label))

        # Wait again
        self.wait(2)

        # Fade out everything
        self.play(FadeOut(circle))

        # Final wait
        self.wait(1)



# from manim import *

# class SystemArchitectureFlow(Scene):
#     def construct(self):
#         # Define colors
#         frontend_color = "#3498db"  # Blue
#         backend_color = "#2ecc71"   # Green
#         database_color = "#e74c3c"  # Red
#         arrow_color = "#f39c12"     # Orange
#         text_color = WHITE
        
#         # Create the components
#         frontend = RoundedRectangle(corner_radius=0.5, height=2, width=3, color=frontend_color)
#         frontend_text = Text("Frontend", color=text_color).scale(0.7)
#         frontend_group = VGroup(frontend, frontend_text).to_edge(LEFT).shift(UP * 0.5)
        
#         backend = RoundedRectangle(corner_radius=0.5, height=2, width=3, color=backend_color)
#         backend_text = Text("Backend", color=text_color).scale(0.7)
#         backend_group = VGroup(backend, backend_text)
        
#         database = Circle(radius=1.2, color=database_color)
#         cylinder_top = Ellipse(width=2.4, height=0.6, color=database_color)
#         cylinder_bottom = Ellipse(width=2.4, height=0.6, color=database_color)
#         cylinder_rect = Rectangle(width=2.4, height=1.5, color=database_color)
        
#         # Adjust the positions to create a cylinder shape
#         cylinder_top.move_to(UP * 0.75)
#         cylinder_rect.next_to(cylinder_top, DOWN, buff=0)
#         cylinder_bottom.next_to(cylinder_rect, DOWN, buff=0)
        
#         # Create the database group
#         database_shape = VGroup(cylinder_rect, cylinder_top, cylinder_bottom)
#         database_text = Text("Database", color=text_color).scale(0.7)
#         database_group = VGroup(database_shape, database_text).to_edge(RIGHT).shift(UP * 0.5)
        
#         # Create the arrows
#         arrow1 = Arrow(frontend.get_right(), backend.get_left(), color=arrow_color, buff=0.3)
#         arrow2 = Arrow(backend.get_right(), database_shape.get_left(), color=arrow_color, buff=0.3)
        
#         # Position backend between frontend and database
#         backend_group.move_to((frontend_group.get_center() + database_group.get_center()) / 2)
        
#         # Create labels for the requests
#         request_text = Text("HTTP Request", color=text_color).scale(0.5)
#         request_text.next_to(arrow1, UP, buff=0.2)
        
#         query_text = Text("Database Query", color=text_color).scale(0.5)
#         query_text.next_to(arrow2, UP, buff=0.2)
        
#         # Animation sequence
#         self.play(Create(frontend_group))
#         self.wait(0.5)
        
#         self.play(Create(backend_group))
#         self.wait(0.5)
        
#         self.play(Create(database_group))
#         self.wait(1)
        
#         # Request flow animations
#         self.play(
#             GrowArrow(arrow1),
#             Write(request_text)
#         )
#         self.wait(0.5)
        
#         self.play(
#             GrowArrow(arrow2),
#             Write(query_text)
#         )
#         self.wait(0.5)
        
#         # Response flow (reverse direction)
#         response_arrow1 = Arrow(database_shape.get_left(), backend.get_right(), color=arrow_color, buff=0.3).shift(DOWN * 0.4)
#         response_arrow2 = Arrow(backend.get_left(), frontend.get_right(), color=arrow_color, buff=0.3).shift(DOWN * 0.4)
        
#         response_text1 = Text("Query Result", color=text_color).scale(0.5)
#         response_text1.next_to(response_arrow1, DOWN, buff=0.2)
        
#         response_text2 = Text("HTTP Response", color=text_color).scale(0.5)
#         response_text2.next_to(response_arrow2, DOWN, buff=0.2)
        
#         self.play(
#             GrowArrow(response_arrow1),
#             Write(response_text1)
#         )
#         self.wait(0.5)
        
#         self.play(
#             GrowArrow(response_arrow2),
#             Write(response_text2)
#         )
#         self.wait(1)
        
#         # Add title
#         title = Text("Three-Tier Architecture Flow", color=YELLOW).scale(0.8)
#         title.to_edge(UP)
#         self.play(Write(title))
        
#         # Highlight the full flow
#         self.play(
#             frontend_group.animate.set_fill(frontend_color, opacity=0.3),
#             backend_group.animate.set_fill(backend_color, opacity=0.3),
#             database_shape.animate.set_fill(database_color, opacity=0.3),
#         )
        
#         self.wait(2)









# from manim import *

# class CreateCircle(Scene):
#     def construct(self):
#         # Create a circle
#         circle = Circle()
#         circle.set_fill(PINK, opacity=0.5)
        
#         # Create text
#         text = Text("Hello from Node.js!", font_size=48)
        
#         # Animate
#         self.play(Create(circle))
#         self.play(Transform(circle, text))
#         self.wait(2)