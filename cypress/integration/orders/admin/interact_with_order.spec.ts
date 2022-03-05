describe('admin interact with order', () => {
    before(() => {
        cy.adminLogin();
    })
    xit('Accept all orders in all branches', () => {
        cy.intercept({ method: 'get', url: 'http://mallonlineback.co:8000/api/get-orders-for-branch/*' }).as('get_orders');
        cy.intercept({ method: 'get', url: 'http://mallonlineback.co:8000/api/get-branches-ids' }).as('branches');
        // => go to orders
        cy.get('.bars > :nth-child(1)').click();
        cy.get('#nav-bar > ul > :nth-child(3) > a').click();
        cy.get('[data-name="orders"]').click();
        // => wait for branches to load
        let branches;
        cy.wait('@branches').then(({ response }) => {
            branches = response.body.length;
        })
        // => wait for orders to load & change the branch if it have not orders
        cy.wait('@get_orders').then(({ response }) => {
            let index = 0;
            function changeBranch() {
                if (response.body.length == 0 && branches > 1) {
                    index++;
                    cy.get('[name="branch_id"]').select(index)
                    cy.wait('@get_orders').then(({ response }) => {
                        if (response.body.length == 0 && branches > index) {
                            changeBranch()
                        }
                    });
                }
            }
            changeBranch()
        })
    })
    it('admin accept one and refuse one', () => {
        cy.intercept({ method: 'get', url: 'http://mallonlineback.co:8000/api/get-orders-for-branch/*' }).as('get_orders');
        cy.intercept({ method: 'get', url: 'http://mallonlineback.co:8000/api/get-branches-ids' }).as('branches');
        cy.get('.bars > :nth-child(1)').click();
        cy.get('#nav-bar > ul > :nth-child(3) > a').click();
        cy.get('[data-name="orders"]').click();
        cy.wait('@branches');
        cy.wait('@get_orders').then(({response}) => {
            // response.body.
            // cy.get(':nth-child(2) > .buttons > .btn-primary').click();
            // cy.get('[name="branch_id"]').select(1,{force:true})
            // cy.wait('@get_orders').then(() => {
            //     cy.get(':nth-child(2) > .buttons > .btn-danger').click();
            // });
        })
    });
    after(()=>{
        cy.logout();
    })
})

export { };