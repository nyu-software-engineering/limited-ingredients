import static org.junit.jupiter.api.Assertions.*;
import java.util.ArrayList;
import org.junit.jupiter.api.Test;

class UtilitiesTest {
	ArrayList<Recipe> res = Utilities.Scrape("https://www.tasteofhome.com/collection/classic-comfort-food-dinners/");
	@Test
	void testURLWith100Recipes() {
		assertEquals(100, res.size());
	}
	@Test
	void testFirstRecipeName() {
		assertEquals("Melt-in-Your-Mouth Chuck Roast", res.get(0).getName());
	}
	@Test
	void testFirstRecipeImageURL() {
		assertEquals("https://www.tasteofhome.com/wp-content/uploads/2017/10/Melt-in-Your-Mouth-Chuck-Roast_EXPS_CWON16_41035_C06_29_3b-696x696.jpg", res.get(0).getImageURL());
	}
	@Test
	void testFirstRecipeIngredients() {
		assertEquals("[\"1 can (14-1/2 ounces) Italian stewed tomatoes, undrained\",\"1/2 cup beef broth\",\"1/2 cup ketchup\",\"3 tablespoons brown sugar\",\"2 tablespoons Worcestershire sauce\",\"4 teaspoons prepared mustard\",\"3 garlic cloves, minced\",\"1 tablespoon soy sauce\",\"2 teaspoons pepper\",\"1/4 teaspoon crushed red pepper flakes\",\"1 large onion, halved and sliced\",\"1 medium green pepper, halved and sliced\",\"1 celery rib, chopped\",\"1 boneless beef chuck roast (2 to 3 pounds)\",\"3 tablespoons cornstarch\",\"1/4 cup cold water\"]", res.get(0).getIngredients());
	}
	@Test
	void testFirstRecipeTotalTime() {
		assertEquals("PT05H20M", res.get(0).getTotalTime());
	}
}
