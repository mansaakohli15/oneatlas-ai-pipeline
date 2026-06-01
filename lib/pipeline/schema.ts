import { AppIntent } from "@/types/intent";
import {
  DataSchema,
  EntityField,
  Relation,
} from "@/types/schema";

function baseFields(): EntityField[] {
  return [
    {
      name: "id",
      type: "uuid",
      nullable: false,
      isRelation: false,
      isPrimary: true,
      isUnique: true,
    },

    {
      name: "tenantId",
      type: "string",
      nullable: false,
      isRelation: false,
      isPrimary: false,
      isUnique: false,
    },

    {
      name: "createdAt",
      type: "datetime",
      nullable: false,
      isRelation: false,
      isPrimary: false,
      isUnique: false,
    },
  ];
}

function getEntityFields(
  entityName: string
): EntityField[] {
  const name =
    entityName.toLowerCase();

  const fields = baseFields();

  if (name.includes("agent")) {
    fields.push(
      {
        name: "fullName",
        type: "string",
        nullable: false,
        isRelation: false,
        isPrimary: false,
        isUnique: false,
      },
      {
        name: "email",
        type: "string",
        nullable: false,
        isRelation: false,
        isPrimary: false,
        isUnique: true,
      },
      {
        name: "phone",
        type: "string",
        nullable: true,
        isRelation: false,
        isPrimary: false,
        isUnique: false,
      }
    );
  }

  else if (name.includes("lead")) {
    fields.push(
      {
        name: "name",
        type: "string",
        nullable: false,
        isRelation: false,
        isPrimary: false,
        isUnique: false,
      },
      {
        name: "email",
        type: "string",
        nullable: true,
        isRelation: false,
        isPrimary: false,
        isUnique: false,
      },
      {
        name: "status",
        type: "string",
        nullable: false,
        isRelation: false,
        isPrimary: false,
        isUnique: false,
      }
    );
  }

  else if (
    name.includes("property")
  ) {
    fields.push(
      {
        name: "address",
        type: "string",
        nullable: false,
        isRelation: false,
        isPrimary: false,
        isUnique: false,
      },
      {
        name: "price",
        type: "decimal",
        nullable: false,
        isRelation: false,
        isPrimary: false,
        isUnique: false,
      },
      {
        name: "propertyType",
        type: "string",
        nullable: false,
        isRelation: false,
        isPrimary: false,
        isUnique: false,
      }
    );
  }

  else if (
    name.includes("deal")
  ) {
    fields.push(
      {
        name: "amount",
        type: "decimal",
        nullable: false,
        isRelation: false,
        isPrimary: false,
        isUnique: false,
      },
      {
        name: "status",
        type: "string",
        nullable: false,
        isRelation: false,
        isPrimary: false,
        isUnique: false,
      },
      {
        name: "closedAt",
        type: "datetime",
        nullable: true,
        isRelation: false,
        isPrimary: false,
        isUnique: false,
      }
    );
  }

  return fields;
}

export function generateSchema(
  intent: AppIntent
): DataSchema {
  const entities =
    intent.entities.map(
      (entityName) => ({
        name: entityName,

        tableName:
          entityName
            .toLowerCase()
            .replace(/\s+/g, "_"),

        fields:
          getEntityFields(
            entityName
          ),

        relations: [] as Relation[],
      })
    );

  return {
    entities,
  };
}