import { MassageId, TherapistUuid } from '@/utils/otherTypes'

type DurationAndPrice = {
    duration: number
    price: number
}

/**
 * A basic class representing choices of
 * a massage type, a therapist, and
 * appointment duration and price.
 */
export default class SelectedOptions {
    durationAndPrice: DurationAndPrice = {
        duration: 0,
        price: 0
    }
    selectedMassage: MassageId = 0
    selectedTherapist: TherapistUuid = ''

    set(durationAndPrice: DurationAndPrice, selectedMassage: MassageId, selectedTherapist: TherapistUuid) {
        this.durationAndPrice = durationAndPrice
        this.selectedMassage = selectedMassage
        this.selectedTherapist = selectedTherapist
    }
}
