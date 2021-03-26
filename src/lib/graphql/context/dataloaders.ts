import Dataloader from 'dataloader';

function createUserLoader() {
  return new Dataloader((keys) => {
    return [] as any;
  });
}

function createFooLoader() {
  return new Dataloader((keys) => {
    return [] as any;
  });
}

export const loaders = {
  userLoader: createUserLoader(),
  fooLoader: createFooLoader(),
};
