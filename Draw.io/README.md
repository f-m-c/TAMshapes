# drawio-tam-stencils

Technical Architecture Modeling (TAM) shapes support for _diagrams.net_ (formerly known as draw.io), an Open Source Web / Desktop application for diagramming.

## Usage

First, in the repository root, run

1. `npm install` (installs packages into `/nodule_modules`)
1. `npm start` (generates shape libraries in `/build`)

Second, in the _diagrams.net_ desktop application,

1. Select _File_ – _Open Library..._
1. Choose one of the `*.xml` files from the `/builds`
   - For example, `TAM-BD.xml` for TAM block diagram shapes

## Alternative solutions

Similar functionality is available with the open source draw.io plugin [tam-drawio](https://github.com/ariel-bentu/tam-drawio). 

