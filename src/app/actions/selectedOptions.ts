import { DurationAndPriceType, MassageId, TherapistUuid } from '@/utils/otherTypes'

/**
 * A basic class representing choices of
 * a massage type, a therapist, and
 * appointment duration and price.
 */
export default class SelectedOptions {
    durationAndPrice: DurationAndPriceType = {
        duration: 0,
        price: 0
    }
    selectedMassage: MassageId = 0
    selectedTherapist: TherapistUuid = ''

    set(durationAndPrice: DurationAndPriceType, selectedMassage: MassageId, selectedTherapist: TherapistUuid) {
        this.durationAndPrice = durationAndPrice
        this.selectedMassage = selectedMassage
        this.selectedTherapist = selectedTherapist
    }
}
