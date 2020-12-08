class Ingredient {
    /**
     * @param {Ingredient} ingredient
     */
    constructor(ingredient) {
        this.id = ingredient ? ingredient.id : -1;
        this.name = ingredient ? ingredient.name : "";
        this.kcal = ingredient ? ingredient.kcal : 0;
        this.protein = ingredient ? ingredient.protein : 0;
        this.carbohydrate = ingredient ? ingredient.carbohydrate : 0;
        this.fat = ingredient ? ingredient.fat : 0;
        this.alcohol = ingredient ? ingredient.alcohol : 0;
        this.organic_acid = ingredient ? ingredient.organic_acid : 0;
        this.roughage = ingredient ? ingredient.roughage : 0;
        this.salt = ingredient ? ingredient.salt : 0;
        this.sugar = ingredient ? ingredient.sugar : 0;
        this.water = ingredient ? ingredient.water : 0;

        this.save = this.save.bind(this);
        this.getId = this.getId.bind(this);
    }

    getId() {
        return this.id;
    }

    create() {}

    /**
     * Updates ingredient in db if already exists in it
     * @throws Exception if is used when it is not yet created in db
     */
    save() {}
}
