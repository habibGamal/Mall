import faker from "@faker-js/faker";
describe('general testing for orders', () => {
    let branches = [];
    let order: number;
    it('User Create Order from 2 different branches', () => {
        cy.intercept({ method: 'get', url: 'http://mallonlineback.co:8000/api/branch' }).as('branches');
        cy.intercept({ method: 'post', url: 'http://mallonlineback.co:8000/api/cart-item' }).as('add_cart_item');
        cy.intercept({ method: 'post', url: 'http://mallonlineback.co:8000/api/create-order' }).as('create_order');
        cy.intercept('/_next/data/development/branch/*.json?id=*').as('access_branch')
        const addItem = (b: number) => {
            // access a branch b
            cy.get(`[href="/branch/${b}"] > .logo > img`).click({ force: true });
            cy.wait('@access_branch');
            // select a product
            cy.get('.products .product:nth-child(1) > .picture').click({ force: true });
            // add to cart
            cy.get('.btn-success').click({ force: true });
            // back to home
            cy.get('a > h2').click();
            // wait for adding the product to cart
            cy.wait('@add_cart_item');
            /* ==== End Cypress Studio ==== */
        }

        cy.login();
        let ids: Array<number>;
        cy.wait('@branches').then(({ response }) => {
            ids = response.body.map(branch => branch.id);
            const [id1, id2] = faker.random.arrayElements(ids, 2);
            branches = [id1, id2];
            addItem(id1);
            addItem(id2);
            // see cart
            cy.get('.cart > .fas').click();
            // go to cart page
            cy.get('#cart > .btn').click();
            // checkout
            cy.get('.summary > .btn-outline-primary').click();
            // place order
            cy.contains('Place Order').click();
            cy.wait('@create_order').then(({ response }) => {
                order = response.body.id;
                expect(response.body).have.all.keys(
                    'created_at',
                    'id',
                    'shipping_cost',
                    'total_cost',
                    'updated_at',
                    'user_id',
                )
            })
            cy.logout();
        });
    });

    it('admin accept one and refuse one', () => {
        cy.adminLogin();
        cy.intercept({ method: 'get', url: 'http://mallonlineback.co:8000/api/get-orders-for-branch/*' }).as('get_orders');
        cy.intercept({ method: 'get', url: 'http://mallonlineback.co:8000/api/get-branches-ids' }).as('branches');
        cy.get('.bars > :nth-child(1)').click();
        cy.get('#nav-bar > ul > :nth-child(3) > a').click();
        cy.get('[data-name="orders"]').click();
        cy.wait('@branches').then(({ response }) => {
            cy.wait('@get_orders').then(() => {
                if (response.body[0].id == branches[0]) {
                    cy.get(`#${order}.order .btn-primary`).click({ force: true });
                } else {
                    cy.get('[name="branch_id"]').select(`${branches[0]}`, { force: true })
                    cy.wait('@get_orders').then(() => {
                        cy.get(`#${order}.order .btn-primary`).click({ force: true });
                    });
                }
                cy.get('[name="branch_id"]').select(`${branches[1]}`, { force: true })
                cy.wait('@get_orders').then(() => {
                    cy.get(`#${order}.order .btn-danger`).click({ force: true });
                });
            })
        });
        cy.logout();
    });
})