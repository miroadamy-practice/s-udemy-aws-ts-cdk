import { Stack } from 'aws-cdk-lib';
import {AttributeType, BillingMode, Table} from 'aws-cdk-lib/aws-dynamodb';

export class GenericTable {

    private tableName: string;
    private primaryKey: string;

    private stack: Stack;
    private table: Table;

    public constructor(name: string, key: string, stack: Stack) {
        this.tableName = name;
        this.primaryKey = key;
        this.stack = stack;

        this.initialize();
    }

    private initialize(){
        this.createTable();
    }

    private createTable() {
        this.table = new Table(this.stack, this.tableName, {
            partitionKey: {
                name: this.primaryKey,
                type: AttributeType.STRING
            },
            tableName: this.tableName,
            billingMode: BillingMode.PAY_PER_REQUEST
        } )
    }
}