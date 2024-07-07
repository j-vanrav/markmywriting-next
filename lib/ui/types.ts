type Actor = "one" | "two";

type Technique_With_Rels = {
  id: string;
  name: string;
  information: string;
  relations: Readonly<
    {
      target_id: string;
      id: string;
      source_id: string;
      source_actor: Actor;
      target_actor: Actor;
      is_duplicated: boolean;
    }[]
  >;
  tags: Readonly<{ id: string; tag: string }[]>;
};

type Technique = Omit<Technique_With_Rels, "relations"> & {
  actor: Actor;
  sources: {
    id: string;
    actor: Actor;
    is_duplicated: boolean;
  }[];
  targets: {
    id: string;
    actor: Actor;
    is_duplicated: boolean;
  }[];
  duplicated: boolean;
};

type OptRdnly<T> = T | Readonly<T>;
