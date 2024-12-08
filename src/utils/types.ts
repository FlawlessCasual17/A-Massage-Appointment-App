/** A table for storing appointments. */
export interface Appointments {
    /** The id of the massage appointment. */
    id: number
    /** The type of massage the patient is booked for. */
    type_of_massage: number // Foreign key referencing massage_types table
    /** The scheduled date of the appointment. */
    scheduled_date?: string // Timestamp with time zone
    /** Additional notes. */
    notes?: string // Optional
    /** The id of the therapist assigned to the appointment. */
    therapist_id: string // UUID
    /** The id of the patient about to enjoy their massage appointment. */
    patient_id: number // Foreign key referencing patients table
}

/** A table for data related to genders. */
export interface Genders {
    /** The id of the gender. */
    id: number
    /** The name/type of gender. */
    type: string
}

/** A table that keeps an organized set of massage types offered. */
export interface MassageType {
    /** The id of the massage type. */
    id: number
    /** The name of the massage type. */
    name: string
}

/** A table for storing data related to patients. */
export interface Patients {
    /** The patient's id. */
    id: number
    /** The patient's first name. */
    first_name: string
    /** The patient's last name. */
    last_name: string
    /** The gender of the patient. */
    gender: number // Foreign key referencing "genders" table
    /** The patient's email. */
    email: string
    /** The patient's phone number. */
    phone_number: string
    /** The id of the therapist in charge of the patient's massage appointment. */
    therapist_id: string // UUID
    /** The id of the appointment they booked. */
    appointment_id: number // Foreign key referencing appointments table
}

/** A table for storing data related to therapists. */
export interface Therapists {
    /** The unique ID associated with the therapist. */
    uuid: string // UUID
    /** The patient's id. */
    first_name: string // Therapist's first name
    /** The therapist's last name. */
    last_name: string // Therapist's last name
    /** The gender of the therapist. */
    gender: number // Foreign key referencing genders table
    /** The therapist's email. */
    email: string // Therapist's email
    /** The therapist's phone number. */
    phone_number: string // Therapist's phone number
    /** The qualifications of the therapist. */
    qualifications: string // Therapist's qualifications
    /** The specialties offered by the therapist. */
    specialties: string // Therapist's specialties
    /** Shows whether the therapist is available or not. */
    availability?: boolean // Therapist's availability (optional)
}
