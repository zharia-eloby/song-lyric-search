import axe = require("axe-core")

export default function logA11yViolations(violations: axe.Result[]) {
    cy.task(
        'log',
        `${violations.length} accessibility violation${
        violations.length === 1 ? '' : 's'
        } ${violations.length === 1 ? 'was' : 'were'} detected`
    )
    // pluck specific keys to keep the table readable
    const violationData = violations.map(
        ({ id, impact, description, nodes }) => ({
            id,
            impact,
            description,
            nodes: nodes.length
        })
    )

    cy.task('table', violationData)
}