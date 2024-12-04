export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

/**
 * The type of the database schema.
 * Know that not every database schema is the same,
 * each one pertains to a different database.
 */
export type Database = {
    public: {
        Tables: {
            Patients: {
                Row: {
                    dateRegistered: string | null
                    emailAddress: string | null
                    firstName: string | null
                    id: string
                    surName: string | null
                    timeRegistered: string | null
                    zipAddress: string | null
                }
                Insert: {
                    dateRegistered?: string | null
                    emailAddress?: string | null
                    firstName?: string | null
                    id?: string
                    surName?: string | null
                    timeRegistered?: string | null
                    zipAddress?: string | null
                }
                Update: {
                    dateRegistered?: string | null
                    emailAddress?: string | null
                    firstName?: string | null
                    id?: string
                    surName?: string | null
                    timeRegistered?: string | null
                    zipAddress?: string | null
                }
                Relationships: []
            }
        }
        Views: { [_ in never]: never }
        Functions: { [_ in never]: never }
        Enums: { [_ in never]: never }
        CompositeTypes: { [_ in never]: never }
    }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

/**
 * The type of the database tables.
 * This is a union of all the tables in the database.
 */
export type Tables<
    PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | {
        schema: keyof Database
    },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof (
            & Database[PublicTableNameOrOptions['schema']]['Tables']
            & Database[PublicTableNameOrOptions['schema']]['Views']
        )
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions['schema']]['Tables'] & Database[PublicTableNameOrOptions['schema']]['Views'])[
        TableName
    ] extends { Row: infer R } ? R : never
    : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
        ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends { Row: infer R } ? R
        : never
    : never

/**
 * The type of the database table inserts.
 * Makes inserting data into the database easier.
*/
export type TablesInsert<
    PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends { Insert: infer I } ? I : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
        ? PublicSchema['Tables'][PublicTableNameOrOptions] extends { Insert: infer I } ? I : never
    : never

/**
 * The type of the database table updates.
 * Makes updating data in the database easier.
 */
export type TablesUpdate<
    PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends { Update: infer U } ? U : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
        ? PublicSchema['Tables'][PublicTableNameOrOptions] extends { Update: infer U } ? U : never
    : never

/**
 * The type of the database table deletes.
 * An enum is a list of values that can be used in a database.
 */
export type Enums<
    PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
        : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never

/**
 * The type of the database composite types.
 */
export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes'] | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
        : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
        ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never
