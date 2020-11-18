import { random } from "lodash";

export function createEmptyMeal() {
    return {
        id: null,
        name: null,
        image: null,
        components: [],
        description: null,
        recipeSteps: [],
        times: [],
        serves: null,
        creatorId: null,
        difficulty: null
    };
}

export function createTestMeal() {
    return {
        id: random(1, 5000000, false),
        name: "Super ultra meal, without any gluten and uranium, with tomato sauce",
        image: "image url",
        components: [
            createTestComponent("onion", 3, "kg"),
            createTestComponent("ham", 200, "g"),
            createTestComponent("eggs", 3, "pcs"),
            createTestComponent("flour", 560, "g"),
            createTestComponent("milk", 150, "ml"),
        ],
        description: "Drawings me opinions returned absolute in. Otherwise therefore sex did are unfeeling something. Certain be ye amiable by exposed so. To celebrated estimating excellence do. Coming either suffer living her gay theirs. Furnished do otherwise daughters contented conveying attempted no. Was yet general visitor present hundred too brother fat arrival. Friend are day own either lively new",
        recipeSteps: [
            createTestStep("Ignorant saw her her drawings marriage laughter. Case oh an that or away sigh do here upon. Acuteness you exquisite ourselves now end forfeited.", "Preparation"),
            createTestStep("Was justice improve age article between. No projection as up preference reasonably delightful celebrated. Preserved and abilities assurance tolerably breakfast use saw."),
            createTestStep("And painted letters forming far village elderly compact. Her rest west each spot his and you knew."),
            createTestStep("Estate gay wooded depart six far her. Of we be have it lose gate bred. Do separate removing or expenses in.", "Fry"),
            createTestStep("No depending be convinced in unfeeling he. Excellence she unaffected and too sentiments her. Rooms he doors there ye aware in by shall. Education remainder in so cordially. His remainder and own dejection daughters sportsmen. Is easy took he shed to kind.", "Bake"),
            createTestStep("Do separate removing or expenses in. Had covered but evident chapter matters anxious.", "Serving")
        ],
        time: {
            total: random(15, 120, false),
            isAbout: Boolean(random(1, false))
        },
        serves: random(1, 6, false),
        creatorId: 1,
        difficulty: "easy"
    };
}



function createTestComponent(name, amount, measure) {
    return {
        name,
        id: random(1, 20000000, false),
        amount,
        measure
    };
}

function createTestStep(description, title) {
    return {
        description,
        title
    };
}