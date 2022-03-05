import faker from "@faker-js/faker";

describe('User interact with order', () => {
    let ids;
    before(() => {
        cy.intercept({ method: 'get', url: 'http://mallonlineback.co:8000/api/branch' }).as('branches');
        cy.login();
        cy.wait('@branches').then(({ response }) => {
            ids = response.body.map(branch => branch.id);
        });
    })
    it('Clear cart', () => {
        cy.intercept({ method: 'get', url: 'http://mallonlineback.co:8000/api/cart-item' }).as('cart_items');
        cy.intercept({ method: 'delete', url: 'http://mallonlineback.co:8000/api/cart-item/*' }).as('delete_cart_items');
        cy.wait('@cart_items').then(({ response }) => {
            if (response.body.length != 0) {
                cy.get('.cart > .fas').click();
                cy.get('.cart-item > .close').then((items) => {
                    const { length } = items;
                    for (let i = 0; i < length; i++) {
                        items[i].click()
                        cy.wait('@delete_cart_items');
                    }
                })
                cy.get('#cart .head .close > .fas').click();
            }
        })

    })
    xit('Clear orders', () => {
        cy.intercept({ method: 'get', url: '/api/get-orders-for-user' }).as('get_orders');
        cy.intercept({ method: 'get', url: 'http://mallonlineback.co:8000/api/cancel-order/*' }).as('delete_order');
        cy.get('.bars > :nth-child(1)').click();
        cy.get(':nth-child(7) > a').click();
        cy.wait('@get_orders').then(({ response }) => {
            if (response.body.length != []) {
                cy.get('.order > .details > .btn.btn-danger').then((buttons) => {
                    const { length } = buttons;
                    for (let i = 0; i < length; i++) {
                        buttons[i].click()
                        cy.wait('@delete_order');
                    }
                })
            }
        });
        // back to home
        cy.get('a > h2').click();
    })

    xit('User Create Order', () => {
        cy.intercept({ method: 'post', url: 'http://mallonlineback.co:8000/api/cart-item' }).as('add_cart_item');
        cy.intercept({ method: 'post', url: 'http://mallonlineback.co:8000/api/create-order' }).as('create_order');
        const addItem = () => {
            // slide to right
            cy.get(':nth-child(6) > .container > .row-show-container > .right-arrow > .fas').click({ force: true });
            // click on product
            cy.get(':nth-child(6) > .container > .row-show-container > .row-show > :nth-child(6) > .picture > span > .img').click();
            // add to cart
            cy.get('.btn-success').click({ force: true });
            // back to home
            cy.get('a > h2').click();
            // wait for adding the product to cart
            cy.wait('@add_cart_item');
        }
        addItem();
        addItem();
        addItem();
        // see cart
        cy.get('.cart > .fas').click();
        // go to cart page
        cy.get('#cart > .btn').click();
        // checkout
        cy.get('.summary > .btn-outline-primary').click();
        // place order
        cy.contains('Place Order').click();
        cy.wait('@create_order').its('response.body').should('have.all.key',
            'created_at',
            'id',
            'shipping_cost',
            'total_cost',
            'updated_at',
            'user_id',
        )
    });
    it('User Create Order from 2 different branches', () => {
        cy.intercept({ method: 'post', url: 'http://mallonlineback.co:8000/api/cart-item' }).as('add_cart_item');
        cy.intercept({ method: 'post', url: 'http://mallonlineback.co:8000/api/create-order' }).as('create_order');
        cy.intercept('/_next/data/development/branch/*.json?id=*').as('access_branch')
        const addItem = (b: number) => {
            // acccess a branch b
            cy.get(`[href="/branch/${b}"] > .logo > img`).click({force:true});
            cy.wait('@access_branch');
            // select a product
            cy.get(':nth-child(2) > .picture > span > .img').click();
            // add to cart
            cy.get('.btn-success').click({ force: true });
            // back to home
            cy.get('a > h2').click();
            // wait for adding the product to cart
            cy.wait('@add_cart_item');
            /* ==== End Cypress Studio ==== */
        }
        const [id1, id2] = faker.random.arrayElements(ids, 2);
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
        cy.wait('@create_order').its('response.body').should('have.all.key',
            'created_at',
            'id',
            'shipping_cost',
            'total_cost',
            'updated_at',
            'user_id',
        )
    });
    after(()=>{
        cy.logout();
    });
})

export { };