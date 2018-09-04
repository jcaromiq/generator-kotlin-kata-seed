package <%= packageName %>

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test

class <%= name %>Test {

    @Test
    @DisplayName("Assert that True is equals to True")
    fun assert_true_true() {
        assertThat(true).isTrue()
    }
}