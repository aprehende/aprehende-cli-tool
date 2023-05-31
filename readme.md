# Aprehende cli tool

Learn CLI Tool is a command line interface (CLI) tool designed to improve your workflow when developing applications with React.

## Development

Once the repo has been cloned, in order to make the build you must make a couple of adjustments

### Compile to run

To compile the project we must execute the command:

```bash
pnpm build
```

This command will compile the code and also start the templates so that we can work with the project safely.

### Execution of the command

In order to test the command we will leave you some examples

**Normal Button component creation**:

```
pnpm dev create component Button
```

**creation of component with Js file**

```
pnpm dev create component Button --only-js
```

In this way Create with js file.

**creation of component with css file**

```
pnpm dev create component Button -c --with-css
```

In this way Create with css file.

**creation of component with hooks folder**

```
pnpm dev create component Button -H --with-hooks
```

In this way create with hooks folder.

**creation of component with styled components**

```
pnpm dev create component Button -s --with-styled
```

In this way create with styled components.

**creation of component with components folder**

```
pnpm dev create component Button -C --with-components
```

In this way create with components folder.

**creation of component with all options (css, styled, components, hooks)**

```
pnpm dev create component Button -f --with-full
```

In this way create with all options (css, styled, components, hooks).

**creation of hook with js file**

```
pnpm dev create component hook -j --only-js
```

In this way create hook with js file.

**Creation of Button component with styled components**:

```
pnpm dev create component Button --with-styled
```

In this way you can test the options that you are developing.
