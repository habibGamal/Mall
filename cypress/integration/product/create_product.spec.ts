import { faker } from '@faker-js/faker';
describe('Create Product', () => {
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    const cantAdd = () => {
        cy.intercept('http://localhost:3000/product/create').as('create_product_page');
        cy.visit('http://localhost:3000/product/create');
        cy.wait('@create_product_page').its('response').should((res) => {
            expect(res.statusCode).to.be.equal(307);
            expect(res.headers.location).to.be.equal('/');
        });
    };
    it('guest can\'t add product', () => {
        cantAdd();
    })
    it('user can\'t add product', () => {
        cy.login();
        cantAdd();
    })
    it('add product', () => {
        // sniffing requests
        cy.intercept('http://mallonlineback.co:8000/api/state').as('user_info');
        cy.intercept('http://mallonlineback.co:8000/api/get-branches-ids').as('store_branches');
        cy.intercept({ method: 'post', url: 'http://mallonlineback.co:8000/api/product' }).as('create_product');
        // go to the site
        cy.adminLogin();
        const createProduct = () => {
            // get random picture number
            const picture = faker.datatype.number({ min: 1, max: 13 });
            // get the picture's x-axis and magnification scale
            const [xAxis, magnify] = pictures[picture];
            // go to create product page
            cy.get('.bars > :nth-child(1)').click();
            cy.get('#nav-bar > ul > :nth-child(2) > a').click();
            // check get branches ids request & confirm its structure
            let branches_length = 1;
            cy.wait('@store_branches').its('response.body')
                .should((branches) => {
                    expect(branches.length).to.be.greaterThan(0);
                    branches_length = branches.length;
                    branches.map(branch => expect(branch).to.have.all.keys('id', 'name'));
                });
            // filling up the inputs
            cy.get('[name="picture"]').selectFile(`public/Test_Pictures/${picture}.jpg`, { force: true });
            cy.get('.toggle-container > .toggle').click({ force: true });
            cy.get('#formControlRange').then(($range) => {
                // get the DOM node
                const range = $range[0];
                // set the value manually
                setter.call(range, magnify);
                // now dispatch the event
                range.dispatchEvent(new Event('change', { bubbles: true }));
            });
            cy.get('.img-drag').trigger('mousedown', 0, 100, { force: true })
                .trigger('mousemove', xAxis, 100, { force: true })
                .trigger('mouseup', { force: true })
            cy.contains('Done').click();
            cy.get('[name="name"]').type(faker.lorem.word(6), { force: true });
            const price = faker.commerce.price(100, 1000, 0,);
            cy.get('[name="price"]').type(price, { force: true });
            cy.get('[name="offer_price"]').type((parseInt(price) - 60).toString(), { force: true });
            cy.get('[name="colors_option"]').type('Red{enter}Yellow{enter}Blue{enter}Gray{enter}');
            cy.get('[name="sizes_option"]').type('M{enter}L{enter}XL{enter}XXL{enter}');
            cy.get('[name="category"]').first().check({ force: true });
            cy.get('[name="branch_id"]').select(faker.datatype.number({ min: 5, max: branches_length }), { force: true });
            cy.get('[name="specifications"]').type(faker.lorem.lines());
            cy.get('[name="brand"]').type('Ashly');
            cy.get('[name="warranty_time"]').type('3');
            cy.get('[name="warranty_date"]').select('Month');
            cy.get('.btn-success').click();
            // confirm the request & check response structure
            cy.wait('@create_product').its('response.body')
                .should('have.all.key',
                    'brand',
                    'category_id',
                    'created_at',
                    'description',
                    'id',
                    'name',
                    'offer_price',
                    'pictures',
                    'price',
                    'returnable',
                    'specifications',
                    'stock',
                    'updated_at',
                    'warranty',
                )
            cy.get('a > h2').click()
        }
        createProduct();
        createProduct();
        createProduct();
        createProduct();
        // createProduct();
        // createProduct();
        // createProduct();
        // createProduct();
        // createProduct();
        // createProduct();
        // createProduct();
        // createProduct();
        // createProduct();
        // createProduct();
        // createProduct();
        // createProduct();
        // createProduct();
        // createProduct();
        // createProduct();
    })
});
const pictures = {
    1: [-300, 3, 'White Bluse'],
    2: [-120, 3, 'Jaket Jense'],
    3: [-300, 3, 'Black Dress'],
    4: [-130, 2, 'Blezer'],
    5: [-300, 3, 'Pants Jense'],
    6: [-300, 3, 'Red Bag'],
    7: [-300, 3, 'White'],
    8: [-300, 3, 'White'],
    9: [-300, 3, 'White'],
    10: [-400, 3, 'White'],
    11: [-210, 3, 'White'],
    12: [-210, 2.7, 'White'],
    13: [-637, 3.8, 'White'],
}
export { };