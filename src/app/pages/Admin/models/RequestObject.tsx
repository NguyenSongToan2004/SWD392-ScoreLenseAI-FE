export interface BilliardTableRequest {
  tableType: string;
  name: string;
  description: string;
  status: "inUse" | "available" | "underMaintainance";
  cameraUrl: string;
  storeID: string;
  active: boolean;
}

export interface BilliardTable {
  billardTableID: string;
  tableCode: string;
  tableType: string;
  name: string;
  description: string;
  status: "inUse" | "available" | "underMaintainance";
  active: boolean;
  storeID: string;
  cameraUrl: string;
}

// Abstract Factory Interface
export abstract class BilliardTableFactory {
  abstract createTableRequest(): BilliardTableRequest;
  abstract createTable(): BilliardTable;
}

// Concrete Factory for Pool Tables
export class PoolTableFactory extends BilliardTableFactory {
  createTableRequest(): BilliardTableRequest {
    return {
      tableType: "Pool",
      name: "",
      description: "Standard pool table",
      status: "available",
      cameraUrl: "",
      storeID: "",
      active: true
    };
  }

  createTable(): BilliardTable {
    return {
      billardTableID: "",
      tableCode: "",
      tableType: "Pool",
      name: "",
      description: "Standard pool table",
      status: "available",
      active: true,
      storeID: "",
      cameraUrl: ""
    };
  }
}

// Concrete Factory for Snooker Tables
export class SnookerTableFactory extends BilliardTableFactory {
  createTableRequest(): BilliardTableRequest {
    return {
      tableType: "Snooker",
      name: "",
      description: "Professional snooker table",
      status: "available",
      cameraUrl: "",
      storeID: "",
      active: true
    };
  }

  createTable(): BilliardTable {
    return {
      billardTableID: "",
      tableCode: "",
      tableType: "Snooker",
      name: "",
      description: "Professional snooker table",
      status: "available",
      active: true,
      storeID: "",
      cameraUrl: ""
    };
  }
}

// Factory Provider
export class TableFactoryProvider {
  static getFactory(tableType: string): BilliardTableFactory {
    switch (tableType.toLowerCase()) {
      case "pool":
        return new PoolTableFactory();
      case "snooker":
        return new SnookerTableFactory();
      default:
        return new PoolTableFactory();
    }
  }
}
