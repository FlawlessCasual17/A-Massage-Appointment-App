/**
 * Represents a JSON-compatible value type.
 * This type can be:
 * - A primitive (string, number, boolean, null)
 * - An object with string keys and JSON values
 * - An array of JSON values
 *
 * This is useful for typing JSON data structures and API responses.
 */
export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

/**
 * Represents the type of the database schema.
 */
export type Database = {
    /**
     * The database schema in use.
     */
    public: {
        /**
         * Contains all tables that belong
         * to the "public" schema.
         */
        Tables: {
            appointments: {
                Row: {
                    /** The date and time of the appointment */
                    appointment_date: string | null
                    /** Unique identifier for the appointment */
                    appointment_id: number
                    /** Foreign key reference to the patient */
                    patient_id: string
                    /** Last name of the assigned therapist */
                    therapist_last_name: string | null
                    /** User ID associated with the appointment */
                    user_id: string | null
                }
                Insert: {
                    /** The date and time of the appointment */
                    appointment_date?: string | null
                    /** Unique identifier for the appointment */
                    appointment_id: number
                    /** Foreign key reference to the patient */
                    patient_id?: string
                    /** Last name of the assigned therapist */
                    therapist_last_name?: string | null
                    /** User ID associated with the appointment */
                    user_id?: string | null
                }
                Update: {
                    /** The date and time of the appointment */
                    appointment_date?: string | null
                    /** Unique identifier for the appointment */
                    appointment_id?: number
                    /** Foreign key reference to the patient */
                    patient_id?: string
                    /** Last name of the assigned therapist */
                    therapist_last_name?: string | null
                    /** User ID associated with the appointment */
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'appointments_patient_id_fkey'
                        columns: ['patient_id']
                        isOneToOne: false
                        referencedRelation: 'patients'
                        referencedColumns: ['id']
                    }
                ]
            }
            massage_types: {
                Row: {
                    /** Name of the massage type */
                    name: string
                    /** Unique identifier for the massage type */
                    type_of_massage: number
                }
                Insert: {
                    /** Name of the massage type */
                    name: string
                    /** Unique identifier for the massage type */
                    type_of_massage: number
                }
                Update: {
                    /** Name of the massage type */
                    name?: string
                    /** Unique identifier for the massage type */
                    type_of_massage?: number
                }
                Relationships: []
            }
            patients: {
                Row: {
                    /** Scheduled appointment date for the patient */
                    appointment_date: string | null
                    /** Date when the patient registered */
                    date_registered: string | null
                    /** Patient's email address */
                    email: string
                    /** Patient's first name */
                    first_name: string
                    /** Patient's gender */
                    gender: string | null
                    /** Unique identifier for the patient */
                    id: string
                    /** Additional notes about the patient */
                    notes: string | null
                    /** Patient's contact number */
                    phone_number: string | null
                    /** Patient's surname */
                    surname: string
                    /** Foreign key reference to massage type */
                    type_of_massage: number
                    /** Associated user ID */
                    user_id: string | null
                }
                Insert: {
                    /** Scheduled appointment date for the patient */
                    appointment_date?: string | null
                    /** Date when the patient registered */
                    date_registered?: string | null
                    /** Patient's email address */
                    email?: string
                    /** Patient's first name */
                    first_name?: string
                    /** Patient's gender */
                    gender?: string | null
                    /** Unique identifier for the patient */
                    id?: string
                    /** Additional notes about the patient */
                    notes?: string | null
                    /** Patient's contact number */
                    phone_number?: string | null
                    /** Patient's surname */
                    surname?: string
                    /** Foreign key reference to massage type */
                    type_of_massage: number
                    /** Associated user ID */
                    user_id?: string | null
                }
                Update: {
                    /** Scheduled appointment date for the patient */
                    appointment_date?: string | null
                    /** Date when the patient registered */
                    date_registered?: string | null
                    /** Patient's email address */
                    email?: string
                    /** Patient's first name */
                    first_name?: string
                    /** Patient's gender */
                    gender?: string | null
                    /** Unique identifier for the patient */
                    id?: string
                    /** Additional notes about the patient */
                    notes?: string | null
                    /** Patient's contact number */
                    phone_number?: string | null
                    /** Patient's surname */
                    surname?: string
                    /** Foreign key reference to massage type */
                    type_of_massage?: number
                    /** Associated user ID */
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'patients_type_of_massage_fkey'
                        columns: ['type_of_massage']
                        isOneToOne: true
                        referencedRelation: 'massage_types'
                        referencedColumns: ['type_of_massage']
                    }
                ]
            }
            therapists: {
                Row: {
                    /** Therapist's working hours and availability */
                    availability: string | null
                    /** Therapist's email address */
                    email: string
                    /** Therapist's first name */
                    first_name: string
                    /** Unique identifier for the therapist */
                    id: number
                    /** Therapist's last name */
                    last_name: string
                    /** Therapist's contact number */
                    phone_number: string | null
                    /** Professional qualifications and certifications */
                    qualifications: string | null
                    /** Areas of expertise and specialized treatments */
                    specialties: string | null
                    /** Associated user ID */
                    user_id: string | null
                }
                Insert: {
                    /** Therapist's working hours and availability */
                    availability?: string | null
                    /** Therapist's email address */
                    email: string
                    /** Therapist's first name */
                    first_name: string
                    /** Unique identifier for the therapist */
                    id?: never
                    /** Therapist's last name */
                    last_name: string
                    /** Therapist's contact number */
                    phone_number?: string | null
                    /** Professional qualifications and certifications */
                    qualifications?: string | null
                    /** Areas of expertise and specialized treatments */
                    specialties?: string | null
                    /** Associated user ID */
                    user_id?: string | null
                }
                Update: {
                    /** Therapist's working hours and availability */
                    availability?: string | null
                    /** Therapist's email address */
                    email?: string
                    /** Therapist's first name */
                    first_name?: string
                    /** Unique identifier for the therapist */
                    id?: never
                    /** Therapist's last name */
                    last_name?: string
                    /** Therapist's contact number */
                    phone_number?: string | null
                    /** Professional qualifications and certifications */
                    qualifications?: string | null
                    /** Areas of expertise and specialized treatments */
                    specialties?: string | null
                    /** Associated user ID */
                    user_id?: string | null
                }
                Relationships: []
            }
        }
        Views: { [_ in never]: never }
        Functions: { [_ in never]: never }
        /**
         * @see {@link Enums} for more information.
         */
        Enums: { [_ in never]: never }
        /**
         * @see {@link CompositeTypes} for more information.
         */
        CompositeTypes: { [_ in never]: never }
    }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

/**
 * Represents the type of the database tables.
 * Allows for access to all the tables in the database.
 */
export type Tables<
    PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] & Database[PublicTableNameOrOptions['schema']]['Views'])
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions['schema']]['Tables'] & Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends { Row: infer R }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
        ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends { Row: infer R }
            ? R
            : never
        : never

/**
 * Represents the type of the database table inserts.
 * Makes inserting data into the database easier.
*/
export type TablesInsert<
    PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends { Insert: infer I }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
        ? PublicSchema['Tables'][PublicTableNameOrOptions] extends { Insert: infer I }
            ? I
            : never
        : never

/**
 * Represents the type of the database table updates.
 * Makes updating data in the database easier.
 */
export type TablesUpdate<
    PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends { Update: infer U }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
        ? PublicSchema['Tables'][PublicTableNameOrOptions] extends { Update: infer U }
            ? U
            : never
        : never

/**
 * Represents **Enums**.
 *
 * An **Enum** is a data type in SQL that allows you
 * to define a column that can only contain a specific
 * set of values. These values are predefined and must
 * be chosen from a list of allowed values.
 */
export type Enums<
    PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
        : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
        ? PublicSchema['Enums'][PublicEnumNameOrOptions]
        : never

/**
 * Represents a **Composite Type**
 *
 * A **Composite Type** is a custom data type
 * that is composed of multiple fields or
 * attributes. It allows you to define a
 * new data type that combines existing data
 * types, such as integers, strings, and
 * booleans, into a single entity.
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
